// JS Exports

/**
 * Patch ROM and open URL at key
 * TODO: Make Source ROM an Option
 * @param {String} url
 * @param {String} key
 * @param {Function} callback
 */
export function patchRom(url, key, callback) {
    const smwcWorld = 'https://smwc.world/patcher/'
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

    fetch(smwcWorld, requestOptions)
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
    console.log('saveOptions:', event)
    const { options } = await chrome.storage.sync.get(['options'])
    let value
    if (event.target.type === 'checkbox') {
        value = event.target.checked
    } else if (event.target.type === 'text') {
        value = event.target.value
    }
    if (value !== undefined) {
        options[event.target.id] = value
        console.log(`Set: ${event.target.id}:`, value)
        await chrome.storage.sync.set({ options })
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
