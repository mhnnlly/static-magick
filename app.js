require('dotenv').config()
const inProduction = process.env.NODE_ENV === "production"
const port = inProduction ? process.env.PROD_PORT : process.env.DEV_PORT

const app = require('express')()
const path = require('path')
const winston = require('winston')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
	new winston.transports.File({ filename: 'error.log', level: 'error' }),
	new winston.transports.File({ filename: 'combined.log' })
    ]
})
if (!inProduction) {
    logger.add(new winston.transports.Console({
	format: winston.format.simple()
    }))
}

app.use('/', require('./routes/index'))
app.use('/magick', require('./routes/magick'))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
