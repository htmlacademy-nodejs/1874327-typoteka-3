const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../../constants`);

class ArticlesService
{
    constructor(articles)
    {
          this._articles = articles;
    }
  
    create(article)
    {
        const newArticle = Object
            .assign({ id: nanoid(MAX_ID_LENGTH), comments: [] }, article);

        this._articles.push(newArticle);
        return newArticle;
    }

    drop(id)
    {
        this._articles = this._articles.filter((article) => article.id !== id);
        return id;
    }

    findAll()
    {
        return this._articles;
    }

    findOne(id)
    {
        return this._articles.find((item) => item.id === id);
    }

    update(oldArticle, article)
    {
        return Object.assign(oldArticle, article);
    }
}
  
module.exports = ArticlesService;