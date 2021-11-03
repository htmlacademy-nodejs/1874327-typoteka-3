'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

class API
{
    constructor(baseURL, timeout)
    {
        this._http = axios.create(
            {
                baseURL,
                timeout
            }
        );
    }

    async _load(url, options)
    {
        const response = await this._http.request({ url, ...options });
        return response.data;
    }

    async getArticles() {
        return this._load(`/articles`);
    }

    async getArticle(id) {
        return this._load(`/articles/${id}`);
    }

    async getCategories() {
        return this._load(`/categories`);
    }

    async getCategoriesWithCounts() {
        return this._load(`/categories/full`);
    }

    async createArticle(data)
    {
        return this._load(`/articles`,
            {
                method: `POST`,
                data
            }
        );
    }

    async search(query) {
        return this._load(`/search`, {params: {query}});
    }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports =
{
    API,
    getAPI: () => defaultAPI
};
