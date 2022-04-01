'use strict';

const { Router } = require(`express`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

const upload = require(`../middlewares/upload`);

const ensureArray = (value) => Array.isArray(value) ? value : [value];

articlesRouter.post(`/add`, 
    upload.single(`upload`),
    async (req, res) => {
        const { body, file } = req;
        const articleData = {
            picture: file ? file.filename : ``,
            categories: [1],//ensureArray(body.category),
            title: body.title,
            announce: body.announcement,
            text: body['full-text'],
            createdDate: new Date(),
            user_id: 1
        };

        try {
            await api.createArticle(articleData);
            res.redirect(`/my`);
        } catch (error) {
            console.log(error.message);
            res.redirect(`/articles/add`);
        }
    }
);

articlesRouter.post(`/:id`,
    upload.single(`upload`),
    async (req, res) => {        
        const { id } = req.params;
        const { body, file } = req;

        const articleData = {
            picture: file ? file.filename : ``,
            categories: [1],//ensureArray(body.category),
            title: body.title,
            announce: body.announcement,
            text: body['full-text'],
            createdDate: new Date()
        };

        console.log(`id: ${id}`);
        console.log(articleData);

        const result = await api.updateArticle(id, articleData);
        if (!result) {
            res.status(404).render(`errors/404.pug`, {});
            return;
        }

        res.render(`post`, { article : articleData } );
    }
);

articlesRouter.get(`/category/:id`, async (req, res) => {
    const id = req.params.id;
    const articles = await api.getArticles({ comments: true });
    const catArticles = articles.filter((article) => article.categories.find((category) => category.id == id));
    const categories = await api.getCategories();
    const curCategory = categories.find((item) => item.id == id);

    res.render(`articles-by-category`, { curCategory, categories, catArticles });
});

articlesRouter.get(`/add`, async (_req, res) => {
    const categories = await api.getCategories();
    res.render(`add-new-post`, { categories });
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(404).render(`errors/404.pug`, {});
        return;
    }

    const article = await api.getArticle(id);

    if (!article) {
        res.status(404).render(`errors/404.pug`, {});
        return;
    }

    res.render(`edit-post`, { article });
});

articlesRouter.get(`/:id`, async (req, res) => {
    
    const { id } = req.params;

    if (id != parseInt(id)) {
        res.status(404).render(`errors/404.pug`, {});
        return;
    }

    const article = await api.getArticle(id);

    if (!article) {
        res.status(404).render(`errors/404.pug`, {});
        return;
    }

    res.render(`post`, { article });
});

module.exports = articlesRouter;