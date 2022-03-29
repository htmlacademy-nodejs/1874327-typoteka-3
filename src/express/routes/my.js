'use strict';

const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const { getFormatedDate } = require(`../lib/utils`);

const myRouter = new Router();

myRouter.get(`/`, async (_req, res) => {
    const articles = await api.getArticles({comments: false});

    articles.map(article => {
        article.createdDate = getFormatedDate(article.createdDate);
        return article;
    })

    res.render(`my`, { articles });
});

myRouter.get(`/comments`, async (_req, res) => {
    const articles = await api.getArticles({comments: true});

    const comments = articles.reduce((acc, article) => {
        acc.push(...article.comments);
        return acc;
    }, []);

    res.render(`comments`, { comments });
});

module.exports = myRouter;
