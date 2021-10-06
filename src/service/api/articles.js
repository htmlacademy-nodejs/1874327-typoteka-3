const { Router } = require(`express`);
const { HttpCode } = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);
const commentExist = require(`../middlewares/comment-exist`);

const route = new Router();

module.exports = (app, articleService, commentService) =>
{
    app.use(`/articles`, route);

    route.get(`/`, async (_req, res) =>
    {
        const articles = await articleService.findAll();
        return res.status(HttpCode.OK)
        .json(articles);
    });

    route.get(`/:articleId`, articleExist(articleService), (_req, res) =>
    {
        if (!res.locals.article)
        {
            return res.status(HttpCode.NOT_FOUND)
                .send(`Not found with ${ req.params.articleId }`);
        }
      
        return res.status(HttpCode.OK)
          .json(res.locals.article);
    });

    route.post(`/`, articleValidator, (req, res) =>
    {
        const article = articleService.create(req.body);
        return res.status(HttpCode.CREATED)
            .json(article);
    });

    route.put(`/:articleId`, articleExist(articleService), (req, res) =>
    {
        const article = articleService.update(res.locals.article, req.body);
        return res.status(HttpCode.OK)
            .json(article);
    });

    route.delete(`/:articleId`, articleExist(articleService), (req, res) =>
    {
        articleService.drop(req.params.articleId);
        return res.status(HttpCode.OK)
            .json(req.params);
    });

    route.get(`/:articleId/comments`, articleExist(articleService), (_req, res) =>
    {
        return res.status(HttpCode.OK)
            .json(res.locals.article.comments);
    });

    route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], (req, res) =>
    {
        commentService.drop(res.locals.article, req.params.commentId);
        return res.status(HttpCode.OK)
            .json(req.params);
    });

    route.post(`/:articleId/comments`, articleExist(articleService), (req, res) =>
    {
        const comment = commentService.create(res.locals.article, req.body);
        return res.status(HttpCode.CREATED)
            .json(comment);
    });
};