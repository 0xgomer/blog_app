import $api from "../axios";
import {AxiosResponse} from "axios";
import {IUserAuth} from "../types";

export default class AuthService {
    static async login({email, password}: {email: string, password: string}): Promise<AxiosResponse<IUserAuth>> {
        return $api.post<IUserAuth>('/login', {email, password})
    }

    static async registration (data: FormData): Promise<AxiosResponse<IUserAuth>> {
        return $api.post<IUserAuth>('/registration', data)
    }

    static async logout () {
        return $api.post('/logout', {withCredentials: true})
    }


    static async refresh () {
        return $api.get<IUserAuth>('/refresh', {withCredentials: true})
    }
}