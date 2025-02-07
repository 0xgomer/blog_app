import PopularService from "../services/popular-service.js";

class PopularController {
    async getComments (req, res, next) {
        try {
            const comments = await PopularService.getComments()

            return res.json(comments)
        } catch (e) {
            next(e)
        }
    }
}

export default new PopularController();