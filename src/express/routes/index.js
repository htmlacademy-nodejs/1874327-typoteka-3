'use strict';

const { Router } = require(`express`);
const indexRouter = new Router();
const api = require(`../api`).getAPI();
const { getFormatedDate } = require(`../lib/utils`);

indexRouter.get(`/main`, (req, res) => res.render(`main`, {}));

indexRouter.get(`/sign-in`, (req, res) => res.render(`login`));

indexRouter.get(`/registration`, (req, res) => res.render(`sign-up`));

indexRouter.get(`/post-user`, (req, res) => res.render(`post-detail`));

indexRouter.get(`/publications-by-category`, (req, res) => res.render(`articles-by-category`));

indexRouter.get(`/admin-comments`, (req, res) => res.render(`comments`));

indexRouter.get(`/admin-publications`, (req, res) => res.render(`my`));

indexRouter.get(`/admin-add-new-post-empty`, (req, res) => res.render(`post`));

indexRouter.get(`/admin-categories`, (req, res) => res.render(`all-categories`));

indexRouter.get(`/register`, (req, res) => res.render(`registration`));

// api

indexRouter.get(`/`, async (_req, res) =>
{
    const [articles, categories] = await Promise.all([
        api.getArticles(),
        api.getCategoriesWithCounts()
    ]);

    articles.forEach(article => {
        article.createdDate = getFormatedDate(article.createdDate);
    });

    res.render(`main`, { articles, categories });
});

indexRouter.get(`/search`, async (req, res) =>
{    
    const { query } = req.query;

    if (!query)
    {
        res.render(`search`, {});
        return;
    }

    try
    {
        const results = await api.search(query);

        results.forEach(article => {
            article.createdDate = getFormatedDate(article.createdDate);
        });

        res.render(`search-result`, {
            results,
            query
        });
    } catch (error)
    {
        res.render(`search-no-result`, {
            results: [],
            query
        });
    }
});

module.exports = indexRouter;
