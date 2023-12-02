// JS for options.html

import { saveOptions, updateOptions } from './exports.js'

document.addEventListener('DOMContentLoaded', initOptions)

chrome.storage.onChanged.addListener(onChanged)

const formInputs = document.querySelectorAll('.options')
formInputs.forEach((el) => el.addEventListener('change', saveOptions))

// document.getElementById('advanced').addEventListener('submit', saveAdvanced)

/**
 * Initialize Options
 * @function initOptions
 */
async function initOptions() {
    console.log('initOptions')
    document.getElementById('version').textContent =
        chrome.runtime.getManifest().version

    const commands = await chrome.commands.getAll()
    document.getElementById('mainKey').textContent =
        commands.find((x) => x.name === '_execute_action').shortcut || 'Not Set'

    const { options } = await chrome.storage.sync.get(['options'])
    console.log('options:', options)
    updateOptions(options)
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
function onChanged(changes, namespace) {
    console.log('onChanged:', changes, namespace)
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'options') {
            console.log(newValue)
            updateOptions(newValue)
        }
    }
}

// /**
//  * Save Options Click
//  * @function saveAdvanced
//  * @param {SubmitEvent} event
//  */
// async function saveAdvanced(event) {
//     console.log('saveOptions:', event)
//     event.preventDefault()
//     // const { url } = await chrome.storage.local.get(['url'])
//     const input = document.getElementById('url')
//     const url = input.value.replace(/\/$/, '')
//     input.value = url
//     console.log(`url: ${url}`)
//     await chrome.storage.local.set({ url })
// }
