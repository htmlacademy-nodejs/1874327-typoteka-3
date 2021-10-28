const express = require(`express`);
const request = require(`supertest`);
const comments = require(`./comments`);
const CommentsService = require(`../data-service/CommentsService`);
const { HttpCode } = require(`../../constants`);
const mockData = require(`../../../mocks-test`);

const createAPI = () =>
{
    const app = express();
    const cloneData = JSON.parse(JSON.stringify(mockData));
    app.use(express.json());
    comments(app, new CommentsService(cloneData));
    
    return app;
};

describe(`API returns a list of all commets`, () =>
{
    const app = createAPI();
  
    let response;
  
    beforeAll(async () =>
    {
        response = await request(app)
            .get(`/comments`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns a list of 11 comments`, () => expect(response.body.length).toBe(11));
  
    test(`First comment's id equals "Gx4TM8"`, () => expect(response.body[0].id).toBe(`Gx4TM8`));
});

