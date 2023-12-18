// JS for popup.html

import { patchRom, saveOptions, updateOptions } from './exports.js'

document.addEventListener('DOMContentLoaded', initPopup)

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

document.getElementById('patch-form').addEventListener('submit', patchForm)

/**
 * Initialize Popup
 * @function initPopup
 */
async function initPopup() {
    console.log('initPopup')
    document.getElementById('patch-input').focus()

    document.getElementById('version').textContent =
        chrome.runtime.getManifest().version
    document.getElementById('homepage_url').href =
        chrome.runtime.getManifest().homepage_url

    const { options, popup } = await chrome.storage.sync.get([
        'options',
        'popup',
    ])
    console.log('options, popup:', options, popup)
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
    console.log('popupLinks:', event)
    event.preventDefault()
    const anchor = event.target.closest('a')
    console.log(`anchor.href: ${anchor.href}`)
    let url
    if (anchor.href.endsWith('html/options.html')) {
        chrome.runtime.openOptionsPage()
        return window.close()
    } else if (anchor.href.startsWith('http')) {
        url = anchor.href
    } else {
        url = chrome.runtime.getURL(anchor.href)
    }
    console.log('url:', url)
    await chrome.tabs.create({ active: true, url })
    return window.close()
}

/**
 * Save Default Radio on Change Callback
 * @function updateSearchType
 * @param {SubmitEvent} event
 */
async function updateSearchType(event) {
    console.log('updateSearchType:', event)
    const { popup } = await chrome.storage.sync.get(['popup'])
    popup.searchType = event.target.id
    await chrome.storage.sync.set({ popup })
    const value = document.getElementById('patch-input').value
    console.log('value:', value)
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
    console.log('linksForm:', event)
    event.preventDefault()
    const value = document.getElementById('patch-input').value
    console.log('value:', value)
    const key = document.querySelector('input[name="searchType"]:checked').value
    console.log('key:', key)
    const callback = (result, key) => {
        console.log('popup callback:', result)
        if (result[key]) {
            chrome.tabs.create({ active: true, url: result[key] }).then()
            window.close()
        } else if (result.error?.__all__) {
            console.warn(result.error.__all__[0])
            showAlert(result.error.__all__[0])
        } else {
            console.warn('Unknown Result:', result)
            showAlert('Unknown Error. Check Logs...')
        }
    }
    patchRom(value, key, callback)
}

function showAlert(message) {
    console.log('showAlert:', message)
    const alert = document.getElementById('popup-alert')
    alert.textContent = message
    alert.classList.remove('d-none')
    $('#popup-alert')
        .fadeTo(5000, 500)
        .slideUp(500, function () {
            $('#popup-alert').slideUp(500)
        })
}
