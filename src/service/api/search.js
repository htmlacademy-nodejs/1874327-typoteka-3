const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);

const route = new Router();

module.exports = (app, articleService) =>
{
    app.use(`/search`, route);

    route.get(`/`, async (req, res) =>
    {
        const articles = await articleService.findByTitle(req.query.query);
        res.status(HttpCode.OK)
            .json(articles);
    });
};