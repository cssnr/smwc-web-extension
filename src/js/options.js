// JS for options.html

import { saveOptions, updateOptions } from './exports.js'

chrome.storage.onChanged.addListener(onChanged)
document.addEventListener('DOMContentLoaded', initOptions)
document
    .querySelectorAll('#options-form input')
    .forEach((el) => el.addEventListener('change', saveOptions))
document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el))

/**
 * Initialize Options
 * @function initOptions
 */
async function initOptions() {
    console.debug('initOptions')
    document.getElementById('version').textContent =
        chrome.runtime.getManifest().version

    const commands = await chrome.commands.getAll()
    document.getElementById('mainKey').textContent =
        commands.find((x) => x.name === '_execute_action').shortcut || 'Not Set'

    const { options } = await chrome.storage.sync.get(['options'])
    console.debug('options:', options)
    updateOptions(options)
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
function onChanged(changes, namespace) {
    console.debug('onChanged:', changes, namespace)
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'options') {
            console.debug(newValue)
            updateOptions(newValue)
        }
    }
}
