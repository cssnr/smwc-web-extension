// JS Background Service Worker

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.contextMenus.onClicked.addListener(onClicked)
chrome.commands.onCommand.addListener(onCommand)
chrome.runtime.onMessage.addListener(onMessage)
chrome.storage.onChanged.addListener(onChanged)

const ghUrl = 'https://github.com/cssnr/smwc-web-extension'

/**
 * On Install Callback
 * @function onInstalled
 * @param {InstalledDetails} details
 */
async function onInstalled(details) {
    console.log('onInstalled:', details)
    const defaultOptions = {
        contextMenu: true,
        showUpdate: false,
    }
    const options = await setDefaultOptions(defaultOptions)
    if (options.contextMenu) {
        createContextMenus()
    }
    if (details.reason === 'install') {
        const url = chrome.runtime.getURL('/html/options.html')
        await chrome.tabs.create({ active: true, url })
    } else if (options.showUpdate && details.reason === 'update') {
        const manifest = chrome.runtime.getManifest()
        if (manifest.version !== details.previousVersion) {
            const url = `${ghUrl}/releases/tag/${manifest.version}`
            console.log(`url: ${url}`)
            await chrome.tabs.create({ active: true, url })
        }
    }
    chrome.runtime.setUninstallURL(`${ghUrl}/issues`)
}

/**
 * On Clicked Callback
 * @function onClicked
 * @param {OnClickData} ctx
 * @param {chrome.tabs.Tab} tab
 */
async function onClicked(ctx, tab) {
    console.log('onClicked:', ctx, tab)
    if (ctx.menuItemId === 'options') {
        const url = chrome.runtime.getURL('/html/options.html')
        await chrome.tabs.create({ active: true, url })
    } else if (ctx.menuItemId === 'rom_patch') {
        patchRom(ctx.linkUrl, 'download')
    } else if (ctx.menuItemId === 'rom_play') {
        patchRom(ctx.linkUrl, 'play')
    } else {
        console.error(`Unknown ctx.menuItemId: ${ctx.menuItemId}`)
    }
}

/**
 * On Command Callback
 * @function onCommand
 * @param {String} command
 */
async function onCommand(command) {
    console.log(`onCommand: ${command}`)
}

/**
 * On Message Callback
 * @function onMessage
 * @param {Object} message
 * @param {MessageSender} sender
 */
async function onMessage(message, sender) {
    console.log('onMessage:', message, sender)
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
function onChanged(changes, namespace) {
    console.log('onChanged:', changes, namespace)
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (
            key === 'options' &&
            oldValue &&
            newValue &&
            oldValue.contextMenu !== newValue.contextMenu
        ) {
            if (newValue?.contextMenu) {
                console.log('Enabled contextMenu...')
                createContextMenus()
            } else {
                console.log('Disabled contextMenu...')
                chrome.contextMenus.removeAll()
            }
        }
    }
}

/**
 * Create Context Menus
 * @function createContextMenus
 */
function createContextMenus() {
    console.log('createContextMenus')
    const ctx = ['all']
    const contexts = [
        [['link'], 'rom_patch', 'normal', 'Patch ROM'],
        [['link'], 'rom_play', 'normal', 'Play ROM'],
        [ctx, 'separator-1', 'separator', 'separator'],
        [ctx, 'options', 'normal', 'Open Options'],
    ]
    contexts.forEach((context) => {
        chrome.contextMenus.create({
            contexts: context[0],
            id: context[1],
            type: context[2],
            title: context[3],
        })
    })
}

/**
 * Set Default Options
 * @function setDefaultOptions
 * @param {Object} defaultOptions
 * @return {Object}
 */
async function setDefaultOptions(defaultOptions) {
    console.log('setDefaultOptions')
    let { options, popup } = await chrome.storage.sync.get(['options', 'popup'])
    options = options || {}
    console.log(options)
    let changed = false
    for (const [key, value] of Object.entries(defaultOptions)) {
        // console.log(`${key}: default: ${value} current: ${options[key]}`)
        if (options[key] === undefined) {
            changed = true
            options[key] = value
            console.log(`Set ${key}:`, value)
        }
    }
    if (changed) {
        await chrome.storage.sync.set({ options })
        console.log(options)
    }
    // TODO: Handle popup default(s) differently
    if (popup?.searchType === undefined) {
        popup = { searchType: 'doPatch' }
        await chrome.storage.sync.set({ popup })
    }
    return options
}

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
