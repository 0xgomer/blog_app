import {AxiosResponse} from "axios";
import {IComment} from "../types";
import $api from "../axios";

export default class CommentsService {
    static async get ({ id, page, limit }: {id: string, page: number, limit: number}): Promise<AxiosResponse<IComment[]>> {
        return $api.get<IComment[]>('/comment', {params: {
            articleId: id, page, limit
        }})
    }

    static async create ({ id, content }: {id: string; content: string}): Promise<AxiosResponse<IComment[]>> {
        console.log(id, content)
        return $api.post<IComment[]>('/comment',
        { content },
        { params: { articleId: id } })
    }
}