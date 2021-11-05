'use strict';

const { Router } = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/upload`);

articlesRouter.get(`/category/:id`, (_req, res) => res.send(`/articles/category/:id`));

articlesRouter.get(`/add`, (_req, res) => {
    res.render(`add-new-post`, { });
});

articlesRouter.get(`/:id`, (_req, res) => res.send(`/articles/:id`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
    const { id } = req.params;
    const article = await api.getArticle(id);

    res.render(`edit-post`, { article });
});

articlesRouter.post(`/add`, 
    upload.single(`photo`),
    async (req, res) => {
        const { body, file } = req;
        const articleData = {
            photo: file ? file.filename : ``,
            category: body.category ? body.category : `Разное`,
            title: body.title,
            announce: body.announcement,
            fullText: body['full-text'],
            createdDate: new Date()
        };

        try {
            await api.createArticle(articleData);
            res.redirect(`/my`);
        } catch (error) {
            res.redirect(`/articles/add`);
        }
    }
);

module.exports = articlesRouter;
