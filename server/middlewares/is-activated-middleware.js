import ApiError from "../exeptions/api-error.js";

export default async (req, res, next) => {
    try {
        const {isActivated} = req.user

        if (!isActivated) return next(ApiError.ForbiddenError())

        next()
    } catch (e) {
        return next(ApiError.ForbiddenError())
    }
}