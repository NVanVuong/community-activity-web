import { IBaseRespone } from "./base.interface"
import { IUser } from "./user.interface"

export interface IAuth {
    accessToken: string | null
    user: IUser | null
}

export interface IAuthSignIn {
    username: string
    password: string
}

export interface IAuthResponse extends IBaseRespone {
    data: {
        accessToken: string
    }
}
