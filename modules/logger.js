const dateTime = require('./dateTime.js')

const log = (message) => {
    console.log(`[${dateTime.format()}] ${message}`)
}

module.exports = {
    log
}