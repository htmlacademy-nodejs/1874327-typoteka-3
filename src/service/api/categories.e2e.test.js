const express = require(`express`);
const request = require(`supertest`);
const category = require(`./categories`);
const DataService = require(`../data-service/CategoriesService`);
const { HttpCode } = require(`../../constants`);

const mockData = require(`../../../mocks-test`);

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () =>
{
    jest.setTimeout(10000)
    let response;
  
    beforeAll(async () =>
    {
        response = await request(app)
            .get(`/categories`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
    test(`Returns list of 5 categories`, () => expect(response.body.length).toBe(5));
  
    test(`Category names are "Спорт","Без рамки","IT","За жизнь","Разное"`,
        () => expect(response.body).toEqual(
            expect.arrayContaining([`Спорт`,`Без рамки`,`IT`,`За жизнь`,`Разное`])
        )
    );
});