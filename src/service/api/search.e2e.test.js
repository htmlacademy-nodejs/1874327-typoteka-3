'use strict';

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const DataService = require(`../data-service/SearchService`);
const { HttpCode } = require(`../../constants`);

const mockData = require(`../../../mocks-test`);

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns articles based on search query`, () => {
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .get(`/search`)
            .query({
                    query: `Как достигнуть успеха`
                });
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`2 articles found`, () => expect(response.body.length).toBe(2));
    test(`Publication has correct id`, () => expect(response.body[0].id).toBe(`RxCDXS`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
        .get(`/search`)
        .query({
            query: `Как продать свою душу`
            })
        .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
        .get(`/search`)
        .expect(HttpCode.BAD_REQUEST)
);