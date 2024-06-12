import { IBaseQuery, IBaseRespone } from "./base.interface"
import { IUserActivity } from "./useractivity.interface"

export interface IProof {
    id: string
    name: string
    description: string
    image: string
    comment: string
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

export interface IProofId extends Pick<IProof, "id"> {}
