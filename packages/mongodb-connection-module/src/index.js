const Mongoose = require('mongoose')

const config = require('../config/database')
const logger = require('./utils/logger')

Mongoose.Promise = global.Promise;

const db = Mongoose.createConnection(config.mongodb.uri, {
    useNewUrlParser: true,
    auth: {
        user: config.mongodb.user,
        password: config.mongodb.pass,
    }
})

db.on('error', (err) => {
    logger.error(`[pl-mongodb-connection-module]: Connection error event: ${err.message}`);
    process.exit(1);
})

db.once('open', () => logger.info(`[pl-mongodb-connection-module]: Connection opened with the DB`))
db.on('connected', () => logger.info(`[pl-mongodb-connection-module]: Mongoose connection is opened it`))