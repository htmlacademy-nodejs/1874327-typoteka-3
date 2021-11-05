'use strict';

const { HttpCode } = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
    const { articleId, commentId } = req.params;
    const comment = service.findOne(articleId, commentId);
  
    if (!comment) {
        return res.status(HttpCode.NOT_FOUND)
            .send(`Comment with ${commentId} not found`);
    }
  
    res.locals.comment = comment;
    return next();
};
