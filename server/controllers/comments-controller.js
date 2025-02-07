import CommentsService from "../services/comments-service.js";

class CommentsController {
    async create(req, res, next) {
        try {
            const {articleId} = req.query
            const userId = req.user.id
            const avatar = req.user.avatar
            const fullName = req.user.fullName
            const content = req.body.content
            const comment = await CommentsService.create({articleId, userId, avatar, fullName, content})

            return res.json(comment)
        }catch (e) {
            next(e)
        }
    }

    async get(req, res, next) {
        try {
            const {page, limit, articleId} = req.query
            const comments = await CommentsService.get({page, limit, articleId})

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', comments.totalCount);

            return res.json(comments.comments)
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id
            const {commentId} = req.query

            const comment = await CommentsService.delete({userId, commentId})

            return res.json(comment)
        }catch (e) {
            next(e)
        }
    }

}

export default new CommentsController();