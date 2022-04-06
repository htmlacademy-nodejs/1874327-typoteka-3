'use strict';

const {Model} = require(`sequelize`);

const Aliase = require(`./aliase`);

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const definePublication = require(`./publication`);

class PublicationCategory extends Model {}

const define = (sequelize) => {
    const Category = defineCategory(sequelize);
    const Comment = defineComment(sequelize);
    const Publication = definePublication(sequelize);
  
    Publication.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `publicationId`, onDelete: `cascade`});
    Comment.belongsTo(Publication, {foreignKey: `publicationId`});

    PublicationCategory.init({}, {sequelize});

    Publication.belongsToMany(Category, {through: PublicationCategory, as: Aliase.CATEGORIES});
    Category.belongsToMany(Publication, {through: PublicationCategory, as: Aliase.PUBLICATIONS});
    Category.hasMany(PublicationCategory, {as: Aliase.PUBLICATION_CATEGORIES});

    return {Category, Comment, Publication, PublicationCategory};
}

module.exports = define;