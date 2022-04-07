'use strict';

const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const { getFormatedDate } = require(`../lib/utils`);

const indexRouter = new Router();

indexRouter.get(`/main`, (_req, res) => res.render(`main`, {}));

indexRouter.get(`/sign-in`, (_req, res) => res.render(`login`));

indexRouter.get(`/registration`, (_req, res) => res.render(`sign-up`));

indexRouter.get(`/post-user`, (_req, res) => res.render(`post-detail`));

indexRouter.get(`/admin-comments`, (_req, res) => res.render(`comments`));

indexRouter.get(`/admin-publications`, (_req, res) => res.render(`my`));

indexRouter.get(`/admin-add-new-post-empty`, (_req, res) => res.render(`post`));

indexRouter.get(`/admin-categories`, (_req, res) => res.render(`all-categories`));

indexRouter.get(`/register`, (_req, res) => res.render(`registration`));

const OFFERS_PER_PAGE = 8;

// api

indexRouter.get(`/`, async (req, res) => {
    let {page = 1} = req.query;
    page = +page;
  
    const limit = OFFERS_PER_PAGE;
  
    const offset = (page - 1) * OFFERS_PER_PAGE;
    let [
      {count, articles},
      categories
    ] = await Promise.all([
      api.getArticles({comments: true, limit, offset}),
      api.getCategoriesWithCounts()
    ]);
  
    const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
  
    res.render(`main`, {articles, page, totalPages, categories});
});

indexRouter.get(`/search`, async (req, res) => {    
    const { query } = req.query;

    if (!query) {
        res.render(`search`, {});
        return;
    }

    try {
        const results = await api.search(query);

        results.forEach(article => {
            article.createdDate = getFormatedDate(article.createdDate);
        });

        res.render(`search-result`, {
            results,
            query
        });
    } catch (error) {
        res.render(`search-no-result`, {
            results: [],
            query
        });
    }
});

module.exports = indexRouter;
