'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const express = require(`express`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

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

        const router = new express.Router();
        router.get(`/posts`, async (_req, res) =>
        {
            try
            {
                const fileContent = await fs.readFile(FILENAME);
                const mocks = JSON.parse(fileContent);
                res.json(mocks);
            } catch (_err)
            {
                res.send([]);
            }
        }); 

        app.use(`/`, router);

        app.use((_req, res) => res
            .status(HttpCode.NOT_FOUND)
            .send(`Not found`));

        app.listen(port, () => console.log(chalk.green(`Сервер запущен на порту: ${DEFAULT_PORT}`)));
    }
};
