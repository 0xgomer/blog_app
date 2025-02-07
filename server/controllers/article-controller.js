import ArticleService from "../services/article-service.js";
import tokenService from "../services/token-service.js";

class ArticleController {
    async create(req, res, next) {
        try {
            const authorId = req.user.id
            const preview = req.file
            const { title, tags, content } = req.body

            const article = await ArticleService.create(authorId, preview, title, tags && JSON.parse(tags), content)

            return res.json(article)
        }  catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {page, limit, search, sort} = req.query
            const articles = await ArticleService.getAll({page, limit, search, sort})

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', articles.totalCount);

            return res.json(articles.articles)
        }catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            let userId
            const {id} = req.query

            if (authorizationHeader) {
                const accessToken = authorizationHeader.split(` `)[1]
                const userData = await tokenService.validateAccessToken(accessToken)
                if (userData) userId = userData.id
            }

            const article = await ArticleService.getOne({id, userId})

            return res.json(article)
        }catch (e) {
            next(e)
        }
    }

    async getMy(req, res, next) {
        try {
            const {id} = req.user
            const {page, limit} = req.query
            const articles = await ArticleService.getMy({userId: id, page, limit})

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', articles.totalCount);

            return res.json(articles.articles)
        }catch (e) {
            next(e)
        }
    }

    async getMyOne(req, res, next) {
        try {
            const {articleId} = req.query
            const userId = req.user.id
            const article = await ArticleService.getMyOne({articleId, userId})

            return res.json(article)
        }catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {articleId} = req.query
            const userId = req.user.id
            const preview = req.file
            const { title, tags, content } = req.body

            const article = await ArticleService.update({articleId, userId, preview, title, tags: tags && JSON.parse(tags), content})

            return res.json(article)
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id
            const {articleId} = req.query
            const article = await ArticleService.delete({userId, articleId})

            return res.json(article)
        }catch (e) {
            next(e)
        }
    }
}

export default new ArticleController();