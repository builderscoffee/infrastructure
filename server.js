/* Express */
const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()

/* BuildersCoffee */
const auth = require('./modules/auth.js')
const packages = require('./modules/packages.js')
const settings = require('./modules/settings.js')
const logger = require('./modules/logger.js')

// Start module 'express-fileupload'
app.use(fileUpload());

app.post('/', async (req, res) => {
    logger.log(`>> Request received to package a project`)
    // Reject function
    const respond = (code, message) => res.status(code).send(message);

    // Check acces
    logger.log(`   Checking Authentication...`)
    const authResult = auth.authenticate(req.headers.authorization)
    if(!authResult.success){
        logger.log(`   Authentication failed: ${authResult.error}`)
        return respond(authResult.code, authResult.error)
    }


    logger.log(`   Checking if a file was given...`)
    // Check if file is given
    if (!req.files || Object.keys(req.files).length === 0){
        logger.log(`   No file was given`)
        return respond(400, 'File not given');
    }

    logger.log(`   Checking project type...`)
    // Check if file has been given
    if (!req.body.type){
        console.log(`   The project type isn't given`)
        return respond(400, 'Type not given');
    }

    logger.log(`   Checking project version...`)
    // Check if version has been given
    if (!req.body.version){
        logger.log(`   The project version isn't given`)
        return respond(400, 'Version not given');
    }

    logger.log(`   Checking if project has a destination...`)
    if(!settings.DESTINATION_PACKAGES[req.body.type])
        return respond(400, `This type has no destination yet (${req.body.type})`);

    logger.log(`   Checking if project has a destination with version ${req.body.version} ...`)
    if(!settings.DESTINATION_PACKAGES[req.body.type][req.body.version])
        return respond(400, `This type has no destination for this version yet (${req.body.version})`);

    respond(200, "Data received")

    for(obj of settings.DESTINATION_PACKAGES[req.body.type][req.body.version]){
        var packageName = obj["package"]
        var innerFolder = obj["inner-folder"]

        logger.log(`   ${packageName}:`)

        while (innerFolder.endsWith("/")){
            innerFolder = innerFolder.substring(0, innerFolder.length - 1)
        }

        const folderDest = `${settings.PACKAGES_FOLDER}/${packageName}`
        const fileDest = `${folderDest}/${innerFolder}${innerFolder.length != 0? "/" : ""}${req.files.file.name}`
        logger.log(`      Writing file to ${fileDest}`)
        const moveResult = await packages.moveFile(req.files.file, fileDest)
        if(!moveResult.success){
            logger.log(`      File couldn't be create at '${fileDest}'`)
            return respond(moveResult.code, moveResult.error)
        }

        logger.log(`      Packaging package ${packageName} to ${settings.PLAYPEN_NETWORK_PACKAGES}`)
        const packageResult = await packages.package(folderDest, settings.PLAYPEN_NETWORK_PACKAGES)
        if(!packageResult){
            logger.log(`      Failed to package ${packageName}`)
            return respond(packageResult.code, packageResult.error)
        }
    }

    packages.restartPlaypenNetwork()
})

app.listen(settings.APP_PORT, () => logger.log(`Start BuildersCoffee Middleware app on port ${settings.APP_PORT}`))