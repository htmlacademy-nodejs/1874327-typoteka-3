'use strict';

const express = require(`express`);
const indexRouter = require(`./routes/index`);
const myRouter = require(`./routes/my.js`);
const articlesRouter = require(`./routes/articles`);

const { getLogger } = require(`../lib/logger`);
const logger = getLogger({ name: `api` });

const DEFAULT_PORT = 8080;

const app = express();

// app.engine('pug', require('pug').__express);
app.set(`views`, `./src/express/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(`./src/express/public`));

app.use(`/`, indexRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.use((_req, res, _next) => res.status(404).render(`errors/404.pug`, {}));

app.use((_err, _req, res, _next) => res.status(500).render(`errors/500.pug`, {}));

app.listen(DEFAULT_PORT, () => logger.info(`Сервер запущен на порту: ${DEFAULT_PORT}`));
