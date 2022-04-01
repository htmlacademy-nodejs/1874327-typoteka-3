'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

module.exports = (app, service) => {
    const route = new Router();
    app.use(`/categories`, route);

    route.get(`/`, async (_req, res) => {
        const categories = await service.findAll();
        res.status(HttpCode.OK)
            .json(categories);
    });

    route.get(`/full`, async (_req, res) => {
        const categories = await service.findAll(true);
        res.status(HttpCode.OK)
            .json(categories);
    });
};