'use strict';

const sequelize = require(`../lib/sequelize`);

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({});

const connectDb = async () => {
    try {
        logger.info(`Trying to connect to database...`);
        await sequelize.authenticate();
    } catch (err) {
        logger.error(`An error occurred: ${err.message}`);
        process.exit(1);
    }
    logger.info(`Connection to database established`);
}

module.exports = connectDb;