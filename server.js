/* Express */
const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()

/* BuildersCoffee */
const auth = require('./modules/auth.js')
const packages = require('./modules/packages.js')
const settings = require('./modules/settings.js')

// Start module 'express-fileupload'
app.use(fileUpload());

app.post('/', async (req, res) => {
    // Reject function
    const respond = (code, message) => res.status(code).send(message);

    // Check acces
    const authResult = auth.authenticate(req.headers.authorization)
    if(!authResult.success)
        return respond(authResult.code, authResult.message)

    // Check if file is given
    if (!req.files || Object.keys(req.files).length === 0)
        return respond(400, 'File not given');

    // Check if folder has been given
    if (!req.body.folder)
      return respond(400, 'Folder not given');
    
    // Move file
    const moveResult = await packages.moveFile(req.files.file, `${settings.PACKAGES_FOLDER}/${req.body.folder}/${req.files.file.name}`)
    if(!moveResult.success)
        return respond(moveResult.code, moveResult.error)

    const packageResult = await packages.package(`${settings.PACKAGES_FOLDER}/${req.body.folder}/${req.files.file.name}`)
    if(!packageResult)
        return respond(packageResult.code, packageResult.error)

    packages.restartPlaypenNetwork()

    respond(200, "Correct")
})

app.listen(settings.APP_PORT, () => console.log(`Start BuildersCoffee Middleware app on port ${settings.APP_PORT}`))