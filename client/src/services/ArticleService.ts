import $api from "../axios";
import {IArticle} from "../types";
import {AxiosResponse} from "axios";

export default class ArticleService {
    static async create({data}: { data: FormData }): Promise<AxiosResponse<IArticle>> {
        return $api.post<IArticle>('/article', data)
    }


    static async getAll ({ page = 1, limit = 10, search = "", sort = "date" }: {page: number, limit: number, search: string, sort: string}): Promise<AxiosResponse<IArticle[]>> {
        return $api.get<IArticle[]>('/article/all', {params: {
                page, limit, search, sort
        }})
    }

    static async getOne ({ id }: {id: string}): Promise<AxiosResponse<IArticle>> {
        return $api.get<IArticle>('/article/one/', {params: {
            id
        }})
    }

    static async getMy ({ page = 1, limit = 10 }: {page: number, limit: number}): Promise<AxiosResponse<IArticle[]>> {
        return $api.get<IArticle[]>('/article/my', {params: {
                page, limit
            }})
    }

    static async update({articleId, data}: { articleId: string, data: FormData }): Promise<AxiosResponse<IArticle>> {
        return $api.patch<IArticle>('/article', data, {
            params: {
                articleId
            }
        })
    }

    static async delete ({ id }: {id: string}): Promise<AxiosResponse<IArticle>> {
        return $api.delete<IArticle>('/article', {params: {
                articleId: id
            }})
    }
}