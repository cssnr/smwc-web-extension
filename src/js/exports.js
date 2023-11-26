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
 */
export function patchRom(url, key) {
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

    // TODO: Pass this in as an argument
    const callback = (result) => {
        console.log(result)
        if (result.error?.__all__) {
            console.warn(result.error.__all__[0])
        } else if (result[key]) {
            chrome.tabs.create({ active: true, url: result[key] }).then()
        } else {
            console.warn('Unknown Result:', result)
        }
    }

    fetch(smwcWorld, requestOptions)
        .then((response) => response.json())
        .then((result) => callback(result))
        .catch((error) => console.warn('error', error))
}
