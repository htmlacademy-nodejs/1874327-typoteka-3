'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const { getRandomInt, shuffle } = require(`../utils`);
const { nanoid } = require(`nanoid`);
const { MAX_ID_LENGTH } = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_PUBLICATION_COUNT = 1000;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MAX_COMMENTS = 4;
const PERIOD = 3 * 30 * 86400 * 1000;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const generateDate = () =>
{
    const now = new Date().getTime();
    return new Date(getRandomInt(now - PERIOD, now));
};

const generateComments = (count, comments) => (
    Array(count).fill({}).map(() => (
    {
        id: nanoid(MAX_ID_LENGTH),
        text: shuffle(comments)
            .slice(0, getRandomInt(1, 3))
            .join(` `),
    }))
);
const generatePublications = (count, sentences, categories, titles, comments) => (
    Array(count).fill({}).map(() =>
    {
        return {
            id: nanoid(MAX_ID_LENGTH),
            title: titles[getRandomInt(0, titles.length - 1)],
            createdDate: generateDate(),
            announce: shuffle(sentences).slice(0, MAX_ANNOUNCE_SENTENCES_COUNT - 1).join(` `),
            fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
            category: categories[getRandomInt(0, categories.length - 1)],
            comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
        };
    })
);

const readContent = async (filePath) =>
{
    try
    {
        const content = await fs.readFile(filePath, `utf8`);
        return content.trim().split(`\n`);
    }
    catch (err)
    {
        console.error(chalk.red(err));
        return [];
    }
};

module.exports =
{
    name: `--generate`,
    async run(args)
    {
        const sentences = await readContent(FILE_SENTENCES_PATH);
        const titles = await readContent(FILE_TITLES_PATH);
        const categories = await readContent(FILE_CATEGORIES_PATH);
        const comments = await readContent(FILE_COMMENTS_PATH);

        const [count] = args;
        const countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;

        if (countPublications > MAX_PUBLICATION_COUNT)
        {
            console.error(chalk.red(`Не больше 1000 публикаций`));
            return 1;
        }

        const content = JSON.stringify(generatePublications(countPublications, sentences, categories, titles, comments));

        try
        {
            await fs.writeFile(FILE_NAME, content);
            console.info(chalk.green(`Операция выполнена успешно. Файл ${FILE_NAME} создан`));
        }
        catch (err)
        {
            console.error(chalk.red(`Ошибка при записи в файл: ${err}`));
            return 1;
        }

        return 0;
    }
};
