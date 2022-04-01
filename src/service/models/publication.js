'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Publication extends Model {}

const define = (sequelize) => Publication.init({
    title: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    picture: DataTypes.STRING,
    announce: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: `Publication`,
    tableName: `publications`
});

module.exports = define;