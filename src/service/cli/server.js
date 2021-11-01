'use strict';

const express = require(`express`);
const routes = require(`../api`);
const { getLogger } = require(`../lib/logger`);
const logger = getLogger({ name: `api` });

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
        
        app.use((req, res, next) =>
        {
            logger.debug(`Request ${req.method} method on route ${req.url}`);
            res.on(`finish`, () => {
                logger.info(`Response status code ${res.statusCode}`);
            });
            next();
        });

        app.use(express.json());
        app.use(`/api`, routes);


        app.use((req, res) =>
        {
            res.status(HttpCode.NOT_FOUND)
              .send(`Not found`);
            logger.error(`Route not found: ${req.url}`);
        });

        app.use((err, _req, _res, _next) =>
        {
            logger.error(`An error occurred on processing request: ${err.message}`);
        });

        try
        {
            app.listen(port, (err) =>
            {
                if (err) {
                    return logger.error(`An error occurred on server creation: ${err.message}`);
                }
        
                return logger.info(`Listening to connections on ${port}`);
            });
        }
        catch (err)
        {
            logger.error(`An error occurred: ${err.message}`);
            process.exit(1);
        }
    }
};
