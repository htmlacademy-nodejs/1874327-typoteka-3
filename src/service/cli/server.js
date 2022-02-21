const express = require(`express`);
const routes = require(`../api`);
const { HttpCode } = require(`../../constants`);

const { getLogger } = require(`../lib/logger`);
const logger = getLogger({ name: `api` });
const connectDb = require(`../lib/db-connect`);

const DEFAULT_PORT = 3000;

module.exports =
{
    name: `--server`,
    async run(args)
    {
        await connectDb();

        const [customPort] = args;
        const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

        const app = express();

        app.use((req, res, next) =>
        {
            logger.debug(`Request ${req.method} on route ${req.url}`);
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
}