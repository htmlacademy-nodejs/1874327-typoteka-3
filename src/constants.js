'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = 0;

const HttpCode =
{
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
};

module.exports =
{
    DEFAULT_COMMAND,
    USER_ARGV_INDEX,
    ExitCode,
    MAX_ID_LENGTH: 6,
    HttpCode
};

module.exports.Env =
{
    DEVELOPMENT: `development`,
    PRODUCTION: `production`
};