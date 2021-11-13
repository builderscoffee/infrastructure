// Application settings
const APP_PORT = 3000

// Authentication settings
const GIT_USERNAME = 'github@builderscoffee.eu'
const GIT_PASSWORD = '$2y$10$.PXnr7LIDdoLF8jxmnhZPOM3jxoeOSvv5drGB/yasW5FQreHjT2X6'

// Discord settings
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/909104879400812574/PXTRUyKBygPw78oAL_sY5S9jWgmNgb5-5Mksn-3ZTjS0VkoTDBqNcUmsMG2mWC5KDB-M';

// File settings
const PACKAGES_FOLDER = '/home/builderscoffee/playpen/pp-client/packages'
const PLAYPEN_NETWORK_SCREEN = 'pp-network'
const PLAYPEN_NETWORK_START_COMMAND = 'bash ./playpen-network.sh'
const PLAYPEN_NETWORK_PACKAGES = '/home/builderscoffee/playpen/pp-network/packages'
const PLAYPEN_CLIENT_SCRIPT = '/home/builderscoffee/playpen/pp-client/playpen-p3.sh'
const DESTINATION_PACKAGES = {
    "bc-action" : {
        "Production": [{
            "package" : "hub-prod",
            "inner-folder" : ""
        }, {
            "package" : "plot-prod",
            "inner-folder" : ""
        }],
        "Developpement" : [{
            "package" : "hub-dev",
            "inner-folder" : ""
        }, {
            "package" : "plot-dev",
            "inner-folder" : ""
        }]
    },
    "api" : {
        "Production": [{
            "package" : "hub-prod",
            "inner-folder" : "plugins"
        }, {
            "package" : "plot-prod",
            "inner-folder" : "plugins"
        }, {
            "package" : "proxy-prod",
            "inner-folder" : "plugins"
        }],
        "Developpement" : [{
            "package" : "hub-dev",
            "inner-folder" : "plugins"
        }, {
            "package" : "plot-dev",
            "inner-folder" : "plugins"
        }, {
            "package" : "proxy-dev",
            "inner-folder" : "plugins"
        }]
    },
    "commons" : {
        "Production": [{
            "package" : "hub-prod",
            "inner-folder" : "plugins"
        }, {
            "package" : "plot-prod",
            "inner-folder" : "plugins"
        }, {
            "package" : "proxy-prod",
            "inner-folder" : "plugins"
        }],
        "Developpement" : [{
            "package" : "hub-dev",
            "inner-folder" : "plugins"
        }, {
            "package" : "plot-dev",
            "inner-folder" : "plugins"
        }, {
            "package" : "proxy-dev",
            "inner-folder" : "plugins"
        }]
    },
    "hub" : {
        "Production": [{
            "package" : "hub-prod",
            "inner-folder" : "plugins"
        }],
        "Developpement" : [{
            "package" : "hub-dev",
            "inner-folder" : "plugins"
        }]
    },
    "buildbattle" : {
        "Production": [{
            "package" : "plot-prod",
            "inner-folder" : "plugins"
        }],
        "Developpement" : [{
            "package" : "plot-dev",
            "inner-folder" : "plugins"
        }]
    }
}

module.exports = {
    APP_PORT,
    GIT_USERNAME,
    GIT_PASSWORD,
    DISCORD_WEBHOOK,
    PACKAGES_FOLDER,
    PLAYPEN_NETWORK_SCREEN,
    PLAYPEN_NETWORK_START_COMMAND,
    PLAYPEN_NETWORK_PACKAGES,
    PLAYPEN_CLIENT_SCRIPT,
    DESTINATION_PACKAGES
}