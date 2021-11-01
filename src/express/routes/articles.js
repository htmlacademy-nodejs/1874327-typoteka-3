'use strict';

const { Router } = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));

articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`));

articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

// api

articlesRouter.get(`/edit/:id`, async (req, res) =>
{
    const { id } = req.params;
    const article = await api.getArticle(id);

    res.render(`post-detail`, { article });
});

module.exports = articlesRouter;
