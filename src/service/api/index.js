const categories = require(`./categories`);
const articles = require(`./articles`);
const search = require(`./search`);
const comment = require(`./comments`);
const getMockData = require(`../lib/get-mock-data`);

const {
    CategoriesService,
    ArticlesService,
    CommentsService,
    SearchService
} = require(`../data-service`);

const { Router } = require(`express`);

const app = new Router();
  
(async () =>
{
    const mockData = await getMockData();
    const commentsService = new CommentsService(mockData)

    categories(app, new CategoriesService(mockData));
    search(app, new SearchService(mockData));
    articles(app, new ArticlesService(mockData), commentsService);
    comment(app, commentsService);
})();

module.exports = app;