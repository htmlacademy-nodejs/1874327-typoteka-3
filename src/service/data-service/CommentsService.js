const { nanoid } = require(`nanoid`);
const MAX_ID_LENGTH = require(`../../constants.js`).MAX_ID_LENGTH;

class CommentsService
{
    constructor(articles)
    {
        this._articles = articles;
    }
    
    create(article, comment)
    {
        const newComment = Object
            .assign({id: nanoid(MAX_ID_LENGTH)}, comment);
    
            article.comments.push(newComment);
        
        return newComment;
    }
    
    drop(article, commentId)
    {
        article.comments = article.comments.filter((comment) => comment.id !== commentId);
        return commentId;
    }
    
    findAll()
    {
        const reducer = (prev, current) => {
            prev.push(...current.comments);
            return prev;
        };

        return this._articles.reduce(reducer, []);
    }

    findOne(articleId, commentId)
    {
        return this._articles.find((item) => 
        {
            if (item.id !== articleId)
                return;

            return item.comments.find((comment) => comment.id === commentId);
        });
    }

}

module.exports = CommentsService;