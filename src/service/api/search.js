'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

module.exports = (app, articleService) => {
    const route = new Router();
    app.use(`/search`, route);

    route.get(`/`, async (req, res) => {
        if (!req.query.query) {
            return res.status(HttpCode.BAD_REQUEST)
                .send(`Query not found`);
        }

        const articles = await articleService.findByTitle(req.query.query);

        if (!articles.length) {
            return res.status(HttpCode.NOT_FOUND)
                .send(`Title '${ req.query.query }' not found`);
        }

        return res.status(HttpCode.OK)
            .json(articles);
    });
};