'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);

const DEFAULT_PORT = 3000;

const HttpCode =
{
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
};

module.exports =
{
    name: `--server`,
    run(args)
    {
        const [customPort] = args;
        const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

        const app = express();
        app.use(express.json());
        app.use(`/api`, routes);

        app.use((_req, res) => res
            .status(HttpCode.NOT_FOUND)
            .send(`Not found`));

        app.listen(port, () => console.log(chalk.green(`Сервер запущен на порту: ${DEFAULT_PORT}`)));
    }
};
