class CommentService {
    constructor(sequelize) {
        this._Publication = sequelize.models.Publication;
        this._Comment = sequelize.models.Comment;
    }
  
    async create(publicationId, comment) {
        return this._Comment.create({
            publicationId,
            ...comment
          });
    }
    
    async drop(id) {
        const deletedRows = this._Comment.destroy({
            where: {id}
        });
        return !!deletedRows;
      }
    
    findAll(publicationId) {
        return this._Comment.findAll({
            where: {publicationId},
            raw: true
        });
    }

    /*findOne(articleId, commentId) {
        return this._articles.find((item) => {
            if (item.id !== articleId) {
                return;
            }

            return item.comments.find((comment) => comment.id === commentId);
        });
    }*/
}

module.exports = CommentService;
