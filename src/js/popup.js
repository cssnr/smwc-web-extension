// JS for popup.html

import {
    patchRom,
    saveOptions,
    showToast,
    updateManifest,
    updateOptions,
} from './exports.js'

document.addEventListener('DOMContentLoaded', initPopup)
document
    .querySelectorAll('a[href]')
    .forEach((el) => el.addEventListener('click', popupLinks))
document
    .querySelectorAll('#options-form input')
    .forEach((el) => el.addEventListener('change', saveOptions))
document
    .getElementsByName('patchType')
    .forEach((el) => el.addEventListener('change', updatePatchType))
document
    .getElementById('patch-form')
    .addEventListener('submit', patchFormSubmit)
document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el))

const patchInput = document.getElementById('patch-input')

/**
 * Initialize Popup
 * @function initPopup
 */
async function initPopup() {
    console.debug('initPopup')

    updateManifest()

    const { options } = await chrome.storage.sync.get(['options'])
    console.debug('options:', options)
    updateOptions(options)
    document.querySelector(
        `input[name="patchType"][value="${options.patchType}"]`
    ).checked = true
    patchInput.placeholder = options.patchType
    patchInput.focus()
}

/**
 * Popup Links Click Callback
 * Firefox requires a call to window.close()
 * @function popupLinks
 * @param {MouseEvent} event
 */
async function popupLinks(event) {
    console.debug('popupLinks:', event)
    event.preventDefault()
    const anchor = event.target.closest('a')
    const href = anchor.getAttribute('href').replace(/^\.+/g, '')
    console.debug('href:', href)
    let url
    if (href.endsWith('html/options.html')) {
        chrome.runtime.openOptionsPage()
        return window.close()
    } else if (href.startsWith('http')) {
        url = href
    } else {
        url = chrome.runtime.getURL(href)
    }
    console.log('url:', url)
    await chrome.tabs.create({ active: true, url })
    return window.close()
}

/**
 * Save Default Radio on Change Callback
 * @function updatePatchType
 * @param {SubmitEvent} event
 */
async function updatePatchType(event) {
    console.debug('updatePatchType', event)
    let { options } = await chrome.storage.sync.get(['options'])
    options.patchType = event.target.value
    console.debug(`options.patchType: ${event.target.value}`)
    await chrome.storage.sync.set({ options })
    patchInput.placeholder = options.patchType
    await patchFormSubmit(event)
}

/**
 * Patch Form Callback
 * @function patchFormSubmit
 * @param {SubmitEvent} event
 */
async function patchFormSubmit(event) {
    console.debug('patchFormSubmit:', event)
    event.preventDefault()
    const submitFormBtn = document.getElementById('submit-form')
    if (submitFormBtn.classList.contains('disabled')) {
        return console.info('Duplicate Click Detected!')
    }
    const value = patchInput.value
    console.debug('value:', value)
    if (!value) {
        console.log('No value for patchInput')
        patchInput.focus()
        return
    }
    submitFormBtn.classList.add('disabled')
    const key = document.querySelector('input[name="patchType"]:checked').value
    console.debug('key:', key)

    /**
     * @param {Object} result
     * @property {Object} result.error
     * @property {Array} result.error.__all__
     * @param key {String}
     */
    const callback = (result, key) => {
        console.debug('popup callback:', result)
        submitFormBtn.classList.remove('disabled')
        if (result[key]) {
            if (key === 'download') {
                chrome.downloads.download({ url: result[key] })
            } else {
                chrome.tabs.create({ active: true, url: result[key] }).then()
            }
            window.close()
        } else if (result.error?.__all__) {
            console.warn(result.error.__all__[0])
            showToast(`Error: ${result.error.__all__[0]}`, 'danger')
        } else {
            console.warn('Unknown Result:', result)
            showToast('Error Patching! Inspect Popup for Details.', 'danger')
        }
    }

    patchRom(value, key, callback)
}
