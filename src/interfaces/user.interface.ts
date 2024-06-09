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

export interface IUserQuery extends IBaseQuery {
    classId: string
    facultyId: string
    yearId: string
    limit: number
    page: number
}

export interface IUserByClassQuery {
    classId: string
}

export interface ICreateUserRequest {
    role: ROLE
    name: string
    studentId?: string
    clazzId?: string
    facultyId?: string
    score?: number
}

export interface IUsersResponse extends IBaseRespone {
    data: {
        users: IUser[]
        total: number
        page: number
        limit: number
    }
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
