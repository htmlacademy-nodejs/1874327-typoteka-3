'use strict';

const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);
const commentExist = require(`../middlewares/comment-exist`);

module.exports = (app, articleService, commentService) => {
    const route = new Router();
    app.use(`/articles`, route);

    route.get(`/`, async (req, res) => {
        const {offset, limit, comments} = req.query;
        let result;
        if (limit || offset) {
          result = await articleService.findPage({limit, offset});
        } else {
          result = await articleService.findAll(comments);
        }
        res.status(HttpCode.OK).json(result);
    });

    route.get(`/:articleId`, articleExist(articleService), async (req, res) => {
        const articles = await articleService.findOne(req.params.articleId);
        return res.status(HttpCode.OK)
        .json(articles);
    });

    route.post(`/`, articleValidator, async (req, res) => {
        const article = await articleService.create(req.body);
        return res.status(HttpCode.CREATED)
            .json(article);
    });

    route.put(`/:articleId`, articleExist(articleService), articleValidator, async (req, res) => {
        const result = await articleService.update(req.params.articleId, req.body);
        return res.status(HttpCode.OK)
            .json(result);
    });

    route.delete(`/:articleId`, articleExist(articleService), async (req, res) => {
        const id = await articleService.drop(req.params.articleId);
        return res.status(HttpCode.OK)
            .json({ id });
    });

    route.get(`/:articleId/comments`, articleExist(articleService), (_req, res) => {
        return res.status(HttpCode.OK)
            .json(res.locals.article.comments);
    });

    route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], async (req, res) => {
        const id = await commentService.drop(res.locals.article, req.params.commentId);
        return res.status(HttpCode.OK)
            .json({ id });
    });

    route.post(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
        const comment = await commentService.create(res.locals.article, req.body);
        return res.status(HttpCode.CREATED)
            .json(comment);
    });
};