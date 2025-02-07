import {AxiosResponse} from "axios";
import {IUser, IUserUpdate} from "../types";
import $api from "../axios";

export default class UserService {
    static async getUser(id: string): Promise<AxiosResponse<IUser>>{
        return $api.get<IUser>('/user', {
            params: {
                id
            }
        })
    }

    static async editUser(data: FormData): Promise<AxiosResponse<IUserUpdate>> {
        return $api.patch<IUserUpdate>('/user', data)
    }
}