'use strict';

const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./publication`);
const DataService = require(`../data-service/PublicationService`);
const CommentService = require(`../data-service/CommentService`);
const { HttpCode } = require(`../../constants`);
const mockData = require(`../../../mocks-test`);

const createAPI = () => {
    const app = express();
    const cloneData = JSON.parse(JSON.stringify(mockData));
    app.use(express.json());
    articles(app, new DataService(cloneData), new CommentService(cloneData));
    
    return app;
};

describe(`API returns a list of all articles`, () => {
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .get(`/articles`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  
    test(`First article's id equals "Cx-wNZ"`, () => expect(response.body[0].id).toBe(`Cx-wNZ`));
});

describe(`API returns an article with given id`, () => {
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .get(`/articles/0C8erK`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Article's title is "Как перестать беспокоиться и начать жить"`, () => expect(response.body.title).toBe(`Как перестать беспокоиться и начать жить`));
});

describe(`API creates an article if data is valid`, () => {
    const newArticle = {
        title: `Тест добавления статьи`,
        announce: `Программировать не настолько сложно, как об этом говорят`,
        text: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
        createdDate: `2021-08-27T00:15:14.409Z`,
        category: `тестирование`
    };
  
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .post(`/articles`)
            .send(newArticle);
    });
  
    test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  
    test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  
    test(`Articles count is changed`, () => request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(6))
    );
});

describe(`API refuses to create an article if data is invalid`, () => {
    const newArticle = {
        title: `Тест добавления статьи`,
        text: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
        createdDate: `2021-08-27T00:15:14.409Z`,
        category: `тестирование`
    };
  
    const app = createAPI();
  
    test(`Without any required property response code is 400`, async () => {
        for (const key of Object.keys(newArticle)) {
            const badArticle = { ...newArticle };
            delete badArticle[key];
            await request(app)
                .post(`/articles`)
                .send(badArticle)
                .expect(HttpCode.BAD_REQUEST);
        }
    });
});

describe(`API changes existent article`, () => {
    const newArticle = {
        title: `Тест добавления статьи измененный`,
        announce: `Программировать не настолько сложно, как об этом говорят`,
        text: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
        createdDate: `2021-08-27T00:15:14.409Z`,
        category: `тестирование`
    };
  
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .put(`/articles/RxCDXS`)
            .send(newArticle);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  
    test(`Article is really changed`, () => request(app)
        .get(`/articles/RxCDXS`)
        .expect((res) => expect(res.body.title).toBe(`Тест добавления статьи измененный`))
    );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
    const app = createAPI();
  
    const validArticle = {
        title: `Тест добавления статьи измененный`,
        announce: `Программировать не настолько сложно, как об этом говорят`,
        text: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
        createdDate: `2021-08-27T00:15:14.409Z`,
        category: `тестирование`
    };
  
    return request(app)
        .put(`/offers/NOEXST`)
        .send(validArticle)
        .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () =>
{
    const app = createAPI();
  
    const invalidArticle = {
        title: `Тест добавления статьи измененный`,
        announce: `Программировать не настолько сложно, как об этом говорят`,
        text: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
        createdDate: `2021-08-27T00:15:14.409Z`
    };
  
    return request(app)
        .put(`/articles/RxCDXS`)
        .send(invalidArticle)
        .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () =>
{
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .delete(`/articles/73y6Oc`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns deleted articles id`, () => expect(response.body.id).toBe(`73y6Oc`));
  
    test(`Articles count is 4 now`, () => request(app)
        .get(`/articles`)
        .expect((res) => {
            expect(res.body.length).toBe(4)
        })
    );
});

test(`API refuses to delete non-existent article`, () => {
    const app = createAPI();
  
    return request(app)
        .delete(`/articles/NOEXST`)
        .expect(HttpCode.NOT_FOUND);
});

// comments tests

describe(`API returns a list of commets with given article id`, () => {
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .get(`/articles/RxCDXS/comments`);
    });
  
    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns a list of 4 comments`, () => expect(response.body.length).toBe(4));
  
    test(`First comment's id equals "ue8TuH"`, () => expect(response.body[0].id).toBe(`ue8TuH`));
});

test(`API refuses to get comments of non-existent publication`, () => {
    const app = createAPI();
  
    return request(app)
        .get(`/articles/NOEXST/comments`)
        .expect(HttpCode.NOT_FOUND);
});

describe(`API creates a comment if data is valid`, () => {
    const newComment = {
        text: `Новый комментарий`
    };
  
    const app = createAPI();
  
    let response;
  
    beforeAll(async () => {
        response = await request(app)
            .post(`/articles/RxCDXS/comments`)
            .send(newComment);
    });
  
    test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  
    test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  
    test(`Comments count is changed`, () => request(app)
        .get(`/articles/RxCDXS/comments`)
        .expect((res) => expect(res.body.length).toBe(5))
    );
});

describe(`API refuses to create a comment if data is invalid`, () => {
    const newComment = {
        text: `Новый комментарий`
    };
  
    const app = createAPI();
  
    test(`Without any required property response code is 400`, async () => {
        for (const key of Object.keys(newComment)) {
            const badComment = { ...newComment };
            delete badComment[key];
            await request(app)
                .post(`/articles`)
                .send(badComment)
                .expect(HttpCode.BAD_REQUEST);
        }
    });
});

describe(`API correctly deletes a comment`, () => {
    const app = createAPI();

    let response;

    beforeAll(async () => {
        response = await request(app)
            .delete(`/articles/RxCDXS/comments/Koiy1L`);
    });

    test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  
    test(`Returns deleted publication`, () => expect(response.body.id).toBe(`Koiy1L`));
  
    test(`Publication count is 3 now`, () => request(app)
        .get(`/articles/RxCDXS/comments`)
        .expect((res) => {
            expect(res.body.length).toBe(3)
        })
    );
});

test(`API refuses to delete non-existent comment`, () => {
    const app = createAPI();
  
    return request(app)
        .delete(`/articles/FveCKb/comments/NOEXST`)
        .expect(HttpCode.NOT_FOUND);
});