// JS for popup.html

import { patchRom, saveOptions, showToast, updateOptions } from './exports.js'

document.addEventListener('DOMContentLoaded', initPopup)
document.getElementById('patch-form').addEventListener('submit', patchForm)
document
    .querySelectorAll('a[href]')
    .forEach((el) => el.addEventListener('click', popupLinks))
document
    .querySelectorAll('#options-form input')
    .forEach((el) => el.addEventListener('change', saveOptions))
document
    .getElementsByName('searchType')
    .forEach((el) => el.addEventListener('change', updateSearchType))
document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el))

/**
 * Initialize Popup
 * @function initPopup
 */
async function initPopup() {
    console.debug('initPopup')
    document.getElementById('patch-input').focus()

    const manifest = chrome.runtime.getManifest()
    document.getElementById('version').textContent = manifest.version
    document.querySelector('[href="homepage_url"]').href = manifest.homepage_url

    const { options, popup } = await chrome.storage.sync.get([
        'options',
        'popup',
    ])
    console.debug('options, popup:', options, popup)
    document.getElementById(popup.searchType).checked = true
    updateOptions(options)
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
    console.info(`anchor.href: ${anchor.href}`)
    if (anchor.href.endsWith('html/options.html')) {
        chrome.runtime.openOptionsPage()
    } else {
        await chrome.tabs.create({ active: true, url: anchor.href })
    }
    return window.close()
}

/**
 * Save Default Radio on Change Callback
 * @function updateSearchType
 * @param {SubmitEvent} event
 */
async function updateSearchType(event) {
    console.debug('updateSearchType:', event)
    const { popup } = await chrome.storage.sync.get(['popup'])
    popup.searchType = event.target.id
    await chrome.storage.sync.set({ popup })
    const value = document.getElementById('patch-input').value
    console.info('value:', value)
    if (value) {
        await patchForm(event)
    }
}

/**
 * Links Form Callback
 * @function patchForm
 * @param {SubmitEvent} event
 */
async function patchForm(event) {
    console.debug('linksForm:', event)
    event.preventDefault()
    const patchRomBtn = document.getElementById('patch-rom')
    if (patchRomBtn.classList.contains('disabled')) {
        return console.info('Duplicate Click Detected!')
    }
    patchRomBtn.classList.add('disabled')
    const value = document.getElementById('patch-input').value
    console.info('value:', value)
    const key = document.querySelector('input[name="searchType"]:checked').value
    console.debug('key:', key)
    const callback = (result, key) => {
        console.debug('popup callback:', result)
        patchRomBtn.classList.remove('disabled')
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
