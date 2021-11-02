'use strict';

const { Router } = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();
const { getFormatedDate } = require(`../lib/utils`);

myRouter.get(`/`, async (_req, res) =>
{
    const articles = await api.getArticles();

    articles.forEach(article => {
        article.createdDate = getFormatedDate(article.createdDate);
    });

    res.render(`my`, { articles });
});

myRouter.get(`/comments`, async (_req, res) =>
{
    const articles = await api.getArticles();

    const comments = articles.reduce((acc, article) =>
    {
        acc.push(...article.comments);
        return acc;
    }, []);

    res.render(`comments`, { comments });
});

module.exports = myRouter;
