import { ROLE } from "@/utils/enums/role.enum"
import { IBaseQuery, IBaseRespone } from "./base.interface"
import { IClazz } from "./clazz.interface"
import { IFaculty } from "./faculty.interface"

export interface IUser {
    id: string
    username: string
    email: string
    name: string
    avatar: string
    phoneNumber: string
    score: number
    studentId: string
    role: string
    clazz: IClazz
    faculty: IFaculty
}

export interface IUserJwt {
    id: string
    username: string
    name: string
    avatar: string
    role: ROLE
}

export interface IUserQuery extends IBaseQuery {}

export interface IUserByClassQuery {
    classId: string
}

export interface IUsersResponse extends IBaseRespone {
    data: IUser[]
}

export interface IMyInfoRespone extends IBaseRespone {
    data: {
        user: IUser
        totalUserActivities: number
    }
}

export interface IUpdateMyInfoResponse extends IBaseRespone {
    data: {
        accessToken: string
    }
}

export interface IUpdateMyInfoRequest extends FormData {}

export interface IUpdatePassword {
    oldPassword: string
    newPassword: string
}
