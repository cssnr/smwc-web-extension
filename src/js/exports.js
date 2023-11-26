// JS Exports

/**
 * Save Options Callback
 * @function saveOptions
 * @param {InputEvent} event
 */
export async function saveOptions(event) {
    console.log('saveOptions:', event)
    let { options } = await chrome.storage.sync.get(['options'])
    options[event.target.id] = event.target.checked
    console.log(`Set: options[${event.target.id}]: ${options[event.target.id]}`)
    await chrome.storage.sync.set({ options })
}

/**
 * Update Options
 * @function initOptions
 * @param {Object} options
 */
export function updateOptions(options) {
    for (const [key, value] of Object.entries(options)) {
        // console.log(`${key}: ${value}`)
        const element = document.getElementById(key)
        if (element) {
            element.checked = value
        }
    }
}

/**
 * Patch ROM and open URL at key
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
