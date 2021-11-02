'use strict';
const moment = require(`moment`);

const getFormatedDate = (date) => moment(date).format(`DD.MM.YYYY, HH:mm`)

module.exports = {
    getFormatedDate
}