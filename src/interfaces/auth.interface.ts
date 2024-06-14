import { IBaseRespone } from "./base.interface"
import { IUserJwt } from "./user.interface"

export interface IAuth {
    accessToken: string | null
    user: IUserJwt | null
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
