'use strict';

class SearchService {

    constructor(articles) {
        this._articles = articles;
    }
  
    findByTitle(searchSubStr) {
        return this._articles.filter(article => article.title.toLowerCase().includes(searchSubStr.toLowerCase()));
    }
}

module.exports = SearchService;
