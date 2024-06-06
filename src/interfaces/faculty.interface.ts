import { IBaseQuery, IBaseRespone } from "./base.interface"

export interface IFaculty {
    id: string
    name: string
    code: string
}

export interface IFacultyQuery extends IBaseQuery {}

export interface IFacultyResponse extends IBaseRespone {
    data: IFaculty[]
}

export interface IFacultyCreate {
    name: string
}

export interface IFacultyDelete extends Pick<IFaculty, "id"> {}
