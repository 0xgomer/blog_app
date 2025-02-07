import UserModel from "../models/user-model.js";
import ApiError from "../exeptions/api-error.js";
import {v4 as uuidv4} from "uuid";
import MailService from "./mail-service.js";
import bcrypt from "bcrypt";
import {deleteFile} from "../utils/index.js";
import UserDto from "../dtos/user-dto.js";

class UserService {
    async getUser (id) {
        if (!id) throw ApiError.BadRequestError(404, 'You don\'t specify a user id!')

        const user = await UserModel.findById(id)

        if (!user) {
            throw ApiError.BadRequestError(404, 'User not found!')
        }

        const userData = new UserDto(user)

        return userData
    }
    async editUser (id, avatar, fullName, email, password) {
        const userData = await UserModel.findById(id)

        if (!userData) {
            await deleteFile(`${avatar?.filename}`)
            throw ApiError.ForbiddenError()
        }

        if (userData._id.toString() !== id) {
            await deleteFile(`${avatar?.filename}`)
            throw ApiError.ForbiddenError()
        }

        if (fullName && fullName.toLowerCase() === userData.fullName.toLowerCase()) {
            await deleteFile(`${avatar?.filename}`)
            throw ApiError.BadRequestError(400, 'The name is the same.')
        }
        if (email && email.toLowerCase() === userData.email.toLowerCase()) {
            await deleteFile(`${avatar?.filename}`)
            throw ApiError.BadRequestError(400, 'The email is the same.')
        }
        if (password) {
            await deleteFile(`${avatar?.filename}`)
            const isPassEquals = await bcrypt.compare(password, userData.password)
            if (isPassEquals) throw ApiError.BadRequestError(400, 'The password must be different from the original one.')
        }

        if (avatar) {
            await deleteFile(userData.avatar)
            userData.avatar = `${avatar?.filename}`
        }
        if (fullName) userData.fullName = fullName
        if (email) {
            const activationLink = uuidv4()

            userData.email = email
            userData.isActivated = false
            userData.activationLink = activationLink

            await MailService.sendActivationMail(email, activationLink)
        }
        if (password) {
            userData.password = await bcrypt.hash(password, 3)
        }

        await userData.save()

        return userData
    }
}

export default new UserService()