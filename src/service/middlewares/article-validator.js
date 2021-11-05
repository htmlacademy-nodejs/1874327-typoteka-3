'use strict';
const logger = require(`../lib/logger`);

const { HttpCode } = require(`../../constants`);

const articleKeys = [`title`, `createdDate`, `announce`, `fullText`, `category`];

module.exports = (req, res, next) => {
    const newArticle = req.body;

    const keys = Object.keys(newArticle);
    const keysExists = articleKeys.every((key) => keys.includes(key));

    if (!keysExists) {
        logger.error(`Bad request on article publish`);
        return res.status(HttpCode.BAD_REQUEST)
            .send(`Bad request`);
    }

    next();
};
