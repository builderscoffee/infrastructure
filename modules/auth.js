const settings = require('./settings.js')

const authenticate = (authorization) => {
    // If not exist, reject
    if (!authorization) {
        return {'code': 401, 'error' : 'No auth given'}
    }

    // Store username & password in a variable
    const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

    // Check auth
    if (!(username == settings.GIT_USERNAME && password == settings.GIT_PASSWORD)) {
        return {'code': 401, 'error' : 'Auth not correct'}
    }

    // Successful authenticate
    return {'success': true}
}

module.exports = {
    authenticate
}