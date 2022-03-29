'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const { getRandomInt, shuffle } = require(`../utils`);

const sequelize = require(`../lib/sequelize`);
const connectDb = require(`../lib/db-connect`);
const initDb = require(`../lib/init-db`);

const DEFAULT_COUNT = 20;
const MAX_PUBLICATION_COUNT = 1000;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MAX_COMMENTS = 4;
const MAX_CATEGORIES_COUNT = 4;
const PERIOD = 3 * 30 * 86400 * 1000;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const generateDate = () => {
    const now = new Date().getTime();
    return new Date(getRandomInt(now - PERIOD, now));
};

const generateComments = (count, comments) => (
    Array(count).fill({}).map(() => ({
        text: shuffle(comments)
            .slice(0, getRandomInt(1, 3))
            .join(` `),
    }))
);

const getRandomSubarray = (items) => {
    items = items.slice();
    let count = getRandomInt(1, MAX_CATEGORIES_COUNT);
    const result = [];
    while (count--) {
        result.push(
                ...items.splice(
                getRandomInt(0, items.length - 1), 1
            )
        );
    }
    return result;
};

const generatePublications = (count, sentences, categories, titles, comments) => (
    Array(count).fill({}).map(() =>{
        return {
            title: titles[getRandomInt(0, titles.length - 1)],
            createdDate: generateDate(),
            announce: shuffle(sentences).slice(0, MAX_ANNOUNCE_SENTENCES_COUNT - 1).join(` `).substr(0, 249),
            text: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `).substr(0, 999),
            categories: getRandomSubarray(categories),
            comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
            user_id: getRandomInt(1, 2)
        };
    })
);

const readContent = async (filePath) => {
    try {
        const content = await fs.readFile(filePath, `utf8`);
        return content.trim().split(`\n`);
    }
    catch (err) {
        console.error(chalk.red(err));
        return [];
    }
};

module.exports = {
    name: `--filldb`,
    async run(args) {
        await connectDb();

        const sentences = await readContent(FILE_SENTENCES_PATH);
        const titles = await readContent(FILE_TITLES_PATH);
        const categories = await readContent(FILE_CATEGORIES_PATH);
        const comments = await readContent(FILE_COMMENTS_PATH);

        const [count] = args;
        const countPublications = Math.min(Number.parseInt(count, 10) || DEFAULT_COUNT, MAX_PUBLICATION_COUNT);
        const publications = generatePublications(countPublications, sentences, categories, titles, comments);
        
        await initDb(sequelize, { categories, publications });
    }
};
