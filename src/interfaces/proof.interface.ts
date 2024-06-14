import { IBaseQuery, IBaseRespone } from "./base.interface"
import { IUserActivity } from "./useractivity.interface"
import { IUser } from "@/interfaces/user.interface"

export interface IComment {
    id: string
    createdAt: string
    content: string
    user: IUser
}

export interface IProof {
    id: string
    name: string
    description: string
    image: string
    comments: IComment[]
    userActivity: IUserActivity
}

export interface IProofQuery extends IBaseQuery {}

export interface IProofResponse extends IBaseRespone {
    data: IProof[]
}

export interface IProofCreateRequest extends FormData {}

export interface IProofSubmitRequest {
    id: string
    formData: FormData
}

export interface IConfirmProofRequest {
    id: string
    comment?: string
}

export interface IProofId extends Pick<IProof, "id"> {}
