import CommentModel from "../models/comment-model.js";
import ArticleModel from "../models/article-model.js";
import ApiError from "../exeptions/api-error.js";

class CommentsService{
    async create({articleId, userId, avatar, fullName, content}) {
        const article = await ArticleModel.findById(articleId)

        if (!article) throw ApiError.BadRequestError(400, 'Article not found');
        if (!content) throw ApiError.BadRequestError(400, 'Content must be a specify')

        const comment = await CommentModel.create({author: userId, avatar, name: fullName, content, articleId})

        await comment.save()

        return comment
    }

    async get({page = 1, limit = 20, articleId}) {
        const article = await ArticleModel.findById(articleId)

        if (!article) throw ApiError.BadRequestError(400, 'Article not found')

        const comments = await CommentModel.find({articleId: articleId}).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit)
        const totalCount = await CommentModel.countDocuments({articleId: articleId})

        return {comments, totalCount}
    }

    async delete({userId, commentId}) {
        if (!commentId) throw ApiError.BadRequestError(404, 'Comment not found!')
        const comment = await CommentModel.findById(commentId)

        if (!comment) throw ApiError.BadRequestError(404, 'Comment not found!')

        if (comment.author.toString() !== userId) {
            throw ApiError.ForbiddenError()
        }else {
            const deleteComment = await comment.deleteOne({_id: commentId})

            return deleteComment
        }
    }
}

export default new CommentsService();