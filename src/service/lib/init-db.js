'use strict';

const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);

module.exports = async (sequelize, {categories, publications}) => {
    const {Category, Publication} = defineModels(sequelize);
    await sequelize.sync({force: true});

    const categoryModels = await Category.bulkCreate(
        categories.map((item) => ({name: item}))
    );

    const categoryIdByName = categoryModels.reduce((acc, next) => ({
        [next.name]: next.id,
        ...acc
    }), {});

    const publicationPromises = publications.map(async (publication) => {
        try {
            const publicationModel = await Publication.create(publication, {include: [Aliase.COMMENTS]});
            await publicationModel.addCategories(
                publication.categories.map(
                    (name) => categoryIdByName[name]
                )
            );
        } catch (err) {
            logger.error(`Db creation error: ${err}`);
        }
    });
    await Promise.all(publicationPromises);
};