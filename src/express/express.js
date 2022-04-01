'use strict';

const express = require(`express`);
const indexRouter = require(`./routes/index`);
const myRouter = require(`./routes/my.js`);
const articlesRouter = require(`./routes/articles`);
const path = require(`path`);

const DEFAULT_PORT = 8080;

const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const app = express();

app.set(`views`, `./src/express/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use(`/`, indexRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.use((_req, res, _next) => res.status(404).render('errors/404.pug', {}));

app.use((_err, _req, res, _next) => res.status(500).render(`errors/500.pug`, {}));

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));