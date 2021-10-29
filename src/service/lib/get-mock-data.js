'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = [];

const { getLogger } = require(`../lib/logger`);
const logger = getLogger({ name: `api` });

const getMockData = async () =>
{
    if (data.length > 0) {
        return data;
    }

    try
    {
        const fileContent = await fs.readFile(FILENAME);
        data = JSON.parse(fileContent);
    } catch (err)
    {
        logger.error(err);
        return (err);
    }

    return data;
};

module.exports = getMockData;