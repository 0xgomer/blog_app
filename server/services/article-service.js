import ArticleModel from "../models/article-model.js";
import ApiError from "../exeptions/api-error.js";
import {deleteFile} from "../utils/index.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

class ArticleService {
    async create(authorId, preview, title, tags, content) {
        const candidate = await ArticleModel.findOne({
            title:
                { $regex: `^${title}`, $options: 'i' }
        })

        if (candidate) {
            if (preview) await deleteFile(`${preview.filename}`)
            throw ApiError.BadRequestError(400, 'Article with this title already exists!')
        }
        if (!authorId) {
            if (preview) await deleteFile(`${preview.filename}`)
            throw ApiError.UnauthorizedError()
        }
        if (!title) {
            if (preview) await deleteFile(`${preview.filename}`)
            throw ApiError.BadRequestError(400, 'You don\'t have title!')
        }
        if (!content) {
            if (preview) await deleteFile(`${preview.filename}`)
            throw ApiError.BadRequestError(400, 'You don\'t have content!')
        }

        const article = await ArticleModel.create({author: authorId, preview: preview ? `${preview.filename}` : '', title, tags, content, views: []})

        return article
    }

    async getAll({ page = 1, limit = 10, search = "", sort = "date" }) {
        const searchRegex = new RegExp(search, 'i');

        const sortField = sort === "views" ? "viewsCount" : "createdAt";

        const articles = await ArticleModel.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "articleId",
                    as: "comments"
                }
            },
            {
                $project: {
                    author: true,
                    preview: true,
                    title: true,
                    tags: true,
                    content: true,
                    viewsCount: { $size: "$views" },
                    commentsCount: { $size: "$comments" },
                    createdAt: true
                }
            },
            {
                $match: {
                    title: { $regex: searchRegex }
                }
            },
            {
                $sort: { [sortField]: -1 }
            },
            {
                $skip: (parseInt(page) - 1) * parseInt(limit)
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        const totalCount = await ArticleModel.countDocuments({
            title: { $regex: searchRegex }
        });

        return { articles, totalCount };
    }

    async getOne({id, userId}) {
        const article = await ArticleModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "articleId",
                    as: "comments"
                }
            },
            {
                $project: {
                    author: true,
                    preview: true,
                    title: true,
                    tags: true,
                    content: true,
                    viewsCount: { $size: "$views" },
                    commentsCount: { $size: "$comments" },
                    createdAt: true
                }
            }
        ]);

        if (!article) throw ApiError.BadRequestError(404, 'Article not found!')

        if (userId) {

            const originalArticle = await ArticleModel.findById(id);

            if (!Array.isArray(originalArticle.views)) {
                originalArticle.views = [];
            }

            const existingViewIndex = originalArticle.views.findIndex(view => view.user.equals(userId));

            if (existingViewIndex === -1) {
                originalArticle.views.push({ user: userId, viewedAt: new Date() });
                await originalArticle.save();
            }
        }

        return article[0];
    }

    async getMy({userId, page = 1, limit = 10}) {
        const articles = await ArticleModel.find({author: userId}).limit(limit).skip((page - 1) * limit)
        const totalCount = await ArticleModel.countDocuments({author: userId});

        return {articles, totalCount}
    }

    async getMyOne({articleId, userId}) {
        const article = await ArticleModel.findOne({_id: articleId})

        if (!article) throw ApiError.BadRequestError(404, 'Article not found!')

        if (article.author.toString() !== userId) {
            throw ApiError.ForbiddenError()
        }

        return article
    }

    async update({articleId, userId, preview, title, tags, content}) {
        const article = await ArticleModel.findById(articleId)

        if (!article) {
            await deleteFile(`${preview?.filename}`)
            throw ApiError.BadRequestError(404, 'Article not found!')
        }

        if (article.author.toString() !== userId) {
            await deleteFile(`${preview?.filename}`)
            throw ApiError.ForbiddenError()
        }

        if (preview) {
            await deleteFile(article.preview)
            article.preview = `${preview.filename}`
        }

        if (title){
            article.title = title
        }

        if (tags){
            article.tags = tags
        }

        if (content){
            article.content = content
        }

        await article.save()

        return article
    }

    async delete({userId, articleId}) {
        const article = await ArticleModel.findById(articleId)

        if (article.author.toString() !== userId) {
            throw ApiError.ForbiddenError()
        }else {
            const deleteArticle = await article.deleteOne({_id: articleId})
            await deleteFile(article.preview)

            return deleteArticle
        }
    }
}

export default new ArticleService();