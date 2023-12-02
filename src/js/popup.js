// JS for popup.html

import { patchRom, saveOptions, updateOptions } from './exports.js'

document.addEventListener('DOMContentLoaded', initPopup)

const buttons = document.querySelectorAll('.popup-click')
buttons.forEach((el) => el.addEventListener('click', popLinks))

const formInputs = document.querySelectorAll('.pop-options')
formInputs.forEach((el) => el.addEventListener('change', saveOptions))

document.getElementsByName('searchType').forEach((el) => {
    el.addEventListener('change', updateSearchType)
})

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

    const { options, popup } = await chrome.storage.sync.get([
        'options',
        'popup',
    ])
    console.log('options, popup:', options, popup)

    document.getElementById(popup.searchType).checked = true
    updateOptions(options)
}

/**
 * Handle Popup Link Clicks
 * @function popLinks
 * @param {MouseEvent} event
 */
async function popLinks(event) {
    console.log('popLinks:', event)
    event.preventDefault()
    const anchor = event.target.closest('a')
    let url
    if (anchor?.dataset?.href.startsWith('http')) {
        url = anchor.dataset.href
    } else if (anchor?.dataset?.href === 'homepage') {
        url = chrome.runtime.getManifest().homepage_url
    } else if (anchor?.dataset?.href === 'options') {
        chrome.runtime.openOptionsPage()
        return window.close()
    } else if (anchor?.dataset?.href) {
        url = chrome.runtime.getURL(anchor.dataset.href)
    }
    console.log('url:', url)
    if (!url) {
        return console.warn('No dataset.href for anchor:', anchor)
    }
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
    let { popup } = await chrome.storage.sync.get(['popup'])
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
    alert.classList.remove('visually-hidden')
    $('#popup-alert')
        .fadeTo(5000, 500)
        .slideUp(500, function () {
            $('#popup-alert').slideUp(500)
        })
}
