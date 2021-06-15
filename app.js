require('dotenv').config()
const inProduction = process.env.NODE_ENV === "production"
const port = inProduction ? process.env.PROD_PORT : process.env.DEV_PORT

const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

app.use('/', require('./routes/index'))
app.use('/magick', require('./routes/magick'))

if (inProduction) {
    const privKey = fs.readFileSync(process.env.KEY_PATH, 'utf8')
    const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8')
    const credentials = {key: privKey, cert: certificate}
    httpsServer = https.createServer(credentials, app)
    httpsServer.listen(port)
} else {
    app.listen(port, () => {
	console.log(`Listening at port: ${port}`)
    })
}
