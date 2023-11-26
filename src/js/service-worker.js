// JS Background Service Worker

import { patchRom } from './exports.js'

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.contextMenus.onClicked.addListener(onClicked)
chrome.commands.onCommand.addListener(onCommand)
chrome.runtime.onMessage.addListener(onMessage)
chrome.storage.onChanged.addListener(onChanged)

chrome.notifications.onClicked.addListener((notificationId) => {
    console.log(`notifications.onClicked: ${notificationId}`)
    chrome.notifications.clear(notificationId)
})

/**
 * On Install Callback
 * @function onInstalled
 * @param {InstalledDetails} details
 */
async function onInstalled(details) {
    console.log('onInstalled:', details)
    const ghUrl = 'https://github.com/cssnr/smwc-web-extension'
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
    const callback = (result, key) => {
        console.log('service-worker callback:', result)
        if (result[key]) {
            chrome.tabs.create({ active: true, url: result[key] }).then()
        } else if (result.error?.__all__) {
            console.warn(result.error.__all__[0])
            sendNotification('Error', result.error.__all__[0])
        } else {
            console.warn('Unknown Result:', result)
            sendNotification('Error', 'Unknown Error. Check the Logs...')
        }
    }
    if (ctx.menuItemId === 'options') {
        const url = chrome.runtime.getURL('/html/options.html')
        await chrome.tabs.create({ active: true, url })
    } else if (ctx.menuItemId === 'rom_patch') {
        patchRom(ctx.linkUrl, 'download', callback)
    } else if (ctx.menuItemId === 'rom_play') {
        patchRom(ctx.linkUrl, 'play', callback)
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
    // TODO: Handle popup default(s) differently?
    if (popup?.searchType === undefined) {
        popup = { searchType: 'doPatch' }
        await chrome.storage.sync.set({ popup })
    }
    return options
}

/**
 * Send Browser Notification
 * @function sendNotification
 * @param {String} title
 * @param {String} text
 * @param {String} id
 * @param {Number} timeout
 */
async function sendNotification(title, text, id = '', timeout = 6) {
    console.log(`sendNotification: ${id || 'randomID'}: ${title} - ${text}`)
    const options = {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('images/logo96.png'),
        title: title,
        message: text,
    }
    chrome.notifications.create(id, options, function (notification) {
        setTimeout(function () {
            chrome.notifications.clear(notification)
        }, timeout * 1000)
    })
}
