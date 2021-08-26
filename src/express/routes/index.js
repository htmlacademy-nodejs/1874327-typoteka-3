'use strict';

const { Router } = require(`express`);
const indexRouter = new Router();

indexRouter.get(`/`, (req, res) => res.render(`main`, {}));

indexRouter.get(`/main`, (req, res) => res.render(`main`, {}));

indexRouter.get(`/sign-in`, (req, res) => res.render(`login`));

indexRouter.get(`/registration`, (req, res) => res.render(`sign-up`));

indexRouter.get(`/search`, (req, res) => res.render(`search`));

indexRouter.get(`/post-user`, (req, res) => res.render(`post-detail`));

indexRouter.get(`/publications-by-category`, (req, res) => res.render(`articles-by-category`));

indexRouter.get(`/admin-comments`, (req, res) => res.render(`comments`));

indexRouter.get(`/admin-publications`, (req, res) => res.render(`my`));

indexRouter.get(`/admin-add-new-post-empty`, (req, res) => res.render(`post`));

indexRouter.get(`/admin-categories`, (req, res) => res.render(`all-categories`));

indexRouter.get(`/register`, (req, res) => res.render(`registration`));

module.exports = indexRouter;
