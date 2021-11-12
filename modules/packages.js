const settings = require('./settings.js')

const moveFile = (file, path) => {
    return new Promise(resolve => {
        file.mv(path, function(err) {
            if (err)
                resolve({'code': 500, 'error': err})
            resolve({'success': true})
        })
    })  
}

const package = (package) => {
    return new Promise(resolve => {
        const process = require('child_process').spawn(
            'bash', [settings.PLAYPEN_CLIENT_SCRIPT, 'pack', package, settings.PLAYPEN_NETWORK_PACKAGES]
        )
        process.stderr.on('data', (data) => {
            console.error(`Something went wrong when packaging ${data}`);
            resolve({'code': 500, 'error': data})
        })
        process.on('close', (code) => {
            resolve({'success': true})
        })
    })
}

const restartPlaypenNetwork = () => {
    require('child_process').spawn(
        'screen', ['-S', settings.PLAYPEN_NETWORK_SCREEN, '-X', 'stuff', '^c']
    )
    require('child_process').spawn(
        'screen', ['-S', settings.PLAYPEN_NETWORK_SCREEN, '-X', 'stuff', settings.PLAYPEN_NETWORK_START_SCRIPT]
    )
}

module.exports = {
    moveFile,
    package,
    restartPlaypenNetwork
}