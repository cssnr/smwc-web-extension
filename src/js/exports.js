// JS Exports

/**
 * Patch ROM and open URL at key
 * TODO: Make Source ROM an Option
 * @param {String} url
 * @param {String} key
 * @param {Function} callback
 */
export function patchRom(url, key, callback) {
    console.debug(`patchRom: ${key}: ${url}`)
    const patcherUrl = 'https://smwc.world/patcher/'
    const sourceRom =
        'https://github.com/videofindersTV/super-mario-world/raw/master/Super.Mario.World.1.smc'
    const formdata = new FormData()
    formdata.append('patch_url', url)
    formdata.append('source_url', sourceRom)
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
    }
    fetch(patcherUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => callback(result, key))
        .catch((error) => console.warn('error', error))
}

/**
 * Save Options Callback
 * @function saveOptions
 * @param {InputEvent} event
 */
export async function saveOptions(event) {
    console.debug('saveOptions:', event)
    const { options } = await chrome.storage.sync.get(['options'])
    let value
    if (event.target.type === 'checkbox') {
        value = event.target.checked
    } else {
        value = event.target.value
    }
    if (value !== undefined) {
        options[event.target.id] = value
        console.info(`Set: ${event.target.id}:`, value)
        await chrome.storage.sync.set({ options })
    } else {
        console.warn(`Unknown Options ID: ${event.target.id}`)
    }
}

/**
 * Update Options based on typeof
 * @function initOptions
 * @param {Object} options
 */
export function updateOptions(options) {
    for (const [key, value] of Object.entries(options)) {
        // console.log(`${key}: ${value}`)
        const el = document.getElementById(key)
        if (el) {
            if (typeof value === 'boolean') {
                el.checked = value
            } else if (typeof value === 'string') {
                el.value = value
            }
        }
    }
}

/**
 * Show Bootstrap Toast
 * @function showToast
 * @param {String} message
 * @param {String} type
 */
export function showToast(message, type = 'success') {
    console.debug(`showToast: ${type}: ${message}`)
    const clone = document.querySelector('.d-none .toast')
    const container = document.getElementById('toast-container')
    if (!clone || !container) {
        return console.warn('Missing clone or container:', clone, container)
    }
    const element = clone.cloneNode(true)
    element.querySelector('.toast-body').innerHTML = message
    element.classList.add(`text-bg-${type}`)
    container.appendChild(element)
    const toast = new bootstrap.Toast(element)
    element.addEventListener('mousemove', () => toast.hide())
    toast.show()
}
