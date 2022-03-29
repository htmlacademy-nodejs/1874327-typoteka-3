'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

module.exports = (app, service) =>
{
    const route = new Router();
    app.use(`/search`, route);

    route.get(`/`, async (req, res) =>
    {
        if (!req.query.query)
            return res.status(HttpCode.BAD_REQUEST)
                .send(`Query not found`);

        const query = await service.findAll(req.query.query);

        if (!query.length)
            return res.status(HttpCode.NOT_FOUND)
                .send(`Title '${ req.query.query }' not found`);

        res.status(HttpCode.OK)
            .json(query);
    });
};