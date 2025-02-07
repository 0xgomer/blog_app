import AuthService from "../services/auth-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exeptions/api-error.js";

class AuthController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError(403, 'Validation error', errors.array()))
            }

            const avatar = req.file
            const {fullName, email, password} = req.body
            const userData = await AuthService.registration(avatar, fullName, email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = AuthService.logout(refreshToken)

            res.clearCookie('refreshToken')

            return res.status(200).json("The user is logged out")
        } catch (e) {
            next(e)
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link

            console.log(activationLink)

            await AuthService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()