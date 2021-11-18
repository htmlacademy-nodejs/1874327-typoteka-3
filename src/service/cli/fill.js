'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const { getRandomInt, shuffle } = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_PUBLICATION_COUNT = 1000;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MIN_COMMENTS_COUNT = 2;
const MAX_COMMENTS_COUNT = 4;
const MAX_ANNOUCE_LENGTH = 250;
const MAX_TEXT_LENGTH = 1000;
const FILE_NAME = `fill-db.sql`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const users = [
    {
      email: `ivanov@example.com`,
      passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
      firstName: `Иван`,
      lastName: `Иванов`,
      avatar: `avatar1.jpg`
    }, {
      email: `petrov@example.com`,
      passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
      firstName: `Пётр`,
      lastName: `Петров`,
      avatar: `avatar2.jpg`
    }
];

const PictureRestrict = {
    MIN: 1,
    MAX: 16,
};

const getPictureFileName = (index) => (`item${index.toString().padStart(2, '0')}.jpg`);

const generateComments = (count, publicationId, userCount, comments) => (    
    Array(count).fill({}).map(() => ({
        userId: getRandomInt(1, userCount),
        publicationId,
        text: shuffle(comments)
            .slice(0, getRandomInt(1, 3))
            .join(` `),
    }))
);

const generatePublications = (count, titles, categoriesCount, userCount, sentences, comments) => (

    Array(count).fill({}).map((_, index) =>{
        return {
            title: titles[getRandomInt(0, titles.length - 1)],
            picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
            announce: shuffle(sentences).slice(0, MAX_ANNOUNCE_SENTENCES_COUNT - 1).join(` `).substr(0, MAX_ANNOUCE_LENGTH),
            text: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `).substr(0, MAX_TEXT_LENGTH),
            category: getRandomInt(0, categoriesCount - 1),
            comments: generateComments(getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT), index + 1, userCount, comments),
            userId: getRandomInt(1, userCount)
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
    name: `--fill-db`,
    async run(args) {
        const sentences = await readContent(FILE_SENTENCES_PATH);
        const titles = await readContent(FILE_TITLES_PATH);
        const categories = await readContent(FILE_CATEGORIES_PATH);
        const commentSentences = await readContent(FILE_COMMENTS_PATH);

        const [count] = args;
        const countPublications = Number.parseInt(count, 10) || DEFAULT_COUNT;

        if (countPublications > MAX_PUBLICATION_COUNT) {
            console.error(chalk.red(`Не больше 1000 публикаций`));
            return 1;
        }

        const publications = generatePublications(countPublications, titles, categories.length, users.length, sentences, commentSentences);

        publications.forEach(pub => console.log(pub.comments));

        const comments = publications.flatMap(publication => publication.comments);

        const publicationCategories = publications.map((publication, index) =>
            ({publicationId: index + 1, categoryId: publication.category}));

        const userValues = users.map(
            ({email, passwordHash, firstName, lastName, avatar}) =>
              `\t('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
        ).join(`,\n`);

        const categoryValues = categories.map((name) => `\t('${name}')`).join(`,\n`);

        const publicationValues = publications.map(
            ({title, picture, announce, text, userId}) =>
                `\t('${title}', '${picture}', '${announce}', '${text}', ${userId})`
        ).join(`,\n`);

        const publicationCategoryValues = publicationCategories.map(
            ({publicationId, categoryId}) =>
                `\t(${publicationId}, ${categoryId})`
        ).join(`,\n`);

        const commentValues = comments.map(
            ({text, userId, publicationId}) =>
                `\t('${text}', ${userId}, ${publicationId})`
        ).join(`,\n`);

        const content = `
INSERT INTO users(email, password, first_name, last_name, avatar) VALUES
${userValues};\n\n
INSERT INTO categories(name) VALUES
${categoryValues};\n\n
ALTER TABLE publications DISABLE TRIGGER ALL;
INSERT INTO publications(title, picture, announce, text, user_id) VALUES
${publicationValues};\n\n
ALTER TABLE publications ENABLE TRIGGER ALL;
ALTER TABLE publications_categories DISABLE TRIGGER ALL;
INSERT INTO publications_categories(publication_id, category_id) VALUES
${publicationCategoryValues};\n\n
ALTER TABLE publications_categories ENABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, publication_id) VALUES
${commentValues};\n\n
ALTER TABLE comments ENABLE TRIGGER ALL;`;

        try {
            await fs.writeFile(FILE_NAME, content);
            console.info(chalk.green(`Операция выполнена успешно. Файл ${FILE_NAME} создан`));
        }
        catch (err) {
            console.error(chalk.red(`Ошибка при записи в файл: ${err}`));
            return 1;
        }

        return 0;
    }
};
