const category = require(`./category`);
const publication = require(`./publication`);
const search = require(`./search`);
const comment = require(`./comment`);

const {
    CategoryService,
    PublicationService,
    CommentService,
    SearchService
} = require(`../data-service`);

const { Router } = require(`express`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const app = new Router();

defineModels(sequelize);

(() => {
    category(app, new CategoryService(sequelize));
    search(app, new SearchService(sequelize));
    publication(app, new PublicationService(sequelize), new CommentService(sequelize));
})();

module.exports = app;