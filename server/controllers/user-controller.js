import {validationResult} from "express-validator";
import ApiError from "../exeptions/api-error.js";
import UserService from "../services/user-service.js";

class UserController {
    async getUser (req, res, next) {
        try {
            const {id} = req.query

            const userData = await UserService.getUser(id)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async editUser (req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError(403, 'Validation error', errors.array()))
            }

            const avatar  = req.file
            const id = req.user.id
            const {fullName, email, password} = req.body
            const userData = await UserService.editUser(id, avatar, fullName, email, password)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()