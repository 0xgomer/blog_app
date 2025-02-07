export interface IUser {
    id: string,
    avatar: string,
    fullName: string,
    email: string,
    isActivated: boolean
}

export interface IUserUpdate {
    avatar?: string,
    fullName?: string,
    email?: string
    password?: string
}

export interface IUserAuth {
    accessToken: string,
    refreshToken: string,
    user: {
        id: string,
        avatar: string,
        fullName: string,
        email: string,
        isActivated: boolean
    }
}

export interface IArticle {
    _id: string,
    author: string,
    preview: string,
    title: string,
    content: string,
    tags: Array<string>,
    createdAt: string,
    viewsCount: number,
    commentsCount: number
}

export interface IError {
    status: number
    message: string
    errors: Array<any>
}

export interface IComment {
    _id: string,
    author: string,
    avatar: string,
    name: string,
    content: string,
    articleId: string,
}