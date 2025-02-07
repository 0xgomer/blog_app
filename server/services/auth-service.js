import UserModel from "../models/user-model.js";
import ApiError from "../exeptions/api-error.js";
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from "uuid";
import UserDto from "../dtos/user-dto.js";
import TokenService from "./token-service.js";
import MailService from "./mail-service.js";

class AuthService {
    async registration (avatar, fullName, email, password)  {
        const candidate = await UserModel.findOne({email})

        if (candidate) throw ApiError.BadRequestError(400, 'User with this email already exist!')

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await UserModel.create({fullName, email, password: hashPassword, avatar: avatar ? `${avatar.filename}` : '', activationLink})

        await MailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }

    async login (email, password) {
        const user = await UserModel.findOne({email})

        if (!user) throw ApiError.BadRequestError(400, 'Incorrect email or password!')

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) throw ApiError.BadRequestError(400, 'Incorrect email or password!')

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }

    async logout (refreshToken){
        const token = await TokenService.removeToken(refreshToken)

        return token
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user) throw ApiError.BadRequestError(400, 'User with this link not found!')

        user.isActivated = true
        await user.save()
    }

    async refresh (refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)

        if (!userData || ! tokenFromDB) throw ApiError.UnauthorizedError()

        const user = await UserModel.findById(userData.id)

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }
}

export default new AuthService()