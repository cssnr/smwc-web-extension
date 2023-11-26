// JS for popup.html

import { patchRom, saveOptions, updateOptions } from './service-worker.js'

document.addEventListener('DOMContentLoaded', initPopup)

const buttons = document.querySelectorAll('.popup-click')
buttons.forEach((el) => el.addEventListener('click', popupClick))

const formInputs = document.querySelectorAll('.pop-options')
formInputs.forEach((el) => el.addEventListener('change', saveOptions))

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

    const { options } = await chrome.storage.sync.get(['options'])
    console.log('options:', options)
    updateOptions(options)
}

/**
 * Handle Popup Clicks
 * @function popupClick
 * @param {MouseEvent} event
 */
async function popupClick(event) {
    console.log('popupClick:', event)
    event.preventDefault()
    let url
    const anchor = event.target.closest('a')
    if (anchor?.dataset?.href) {
        if (anchor.dataset.href === 'homepage_url') {
            url = chrome.runtime.getManifest().homepage_url
        } else if (anchor.dataset.href.startsWith('http')) {
            url = anchor.dataset.href
        } else {
            url = chrome.runtime.getURL(anchor.dataset.href)
        }
    }
    console.log(`url: ${url}`)
    if (url) {
        await chrome.tabs.create({ active: true, url })
    } else {
        console.warn('No dataset.href for anchor:', anchor)
    }
    return window.close()
}

/**
 * Links Form Callback
 * @function patchForm
 * @param {SubmitEvent} event
 */
async function patchForm(event) {
    console.log('linksForm:', event)
    event.preventDefault()
    const value = event.target[0].value
    patchRom(value, 'download')
}
