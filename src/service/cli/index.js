'use strict';

const help = require(`./help`);
const filldb = require(`./filldb`);
const version = require(`./version`);
const server = require(`./server`);
const fill = require(`./fill`);

const Cli = {
    [filldb.name]: filldb,
    [fill.name]: fill,
    [help.name]: help,
    [version.name]: version,
    [server.name]: server,
};

module.exports = {
    Cli
};
