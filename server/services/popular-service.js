import ArticleModel from "../models/article-model.js";
import CommentModel from "../models/comment-model.js";

class PopularService {
    async getComments () {
        const articles = await ArticleModel.aggregate([
            {
                $project: {
                    viewsCount: { $size: "$views" },
                }
            },
            {
                $sort: { viewsCount: -1 }
            },
            {
                $limit: 4
            }
        ])
        const articleIds = articles.map(article => article._id);
        const commentPromises = articleIds.map(articleId => {
            return CommentModel.findOne({ articleId: articleId });
        });
        const comments = Promise.all(commentPromises).then(comments => {
            const articlesWithComments = articles.map((article, index) => {
                return comments[index];
            });

            return articlesWithComments
        });


        return comments
    }
}

export default new PopularService();