import { IBaseQuery, IBaseRespone } from "./base.interface"

export interface ICategory {
    id: string
    name: string
    index: number
    subcategories: ISubcategory[]
}

export interface ICategoryQuery extends IBaseQuery {}

export interface ICategoryResponse extends IBaseRespone {
    data: ICategory[]
}

export interface ICategoryCreate {
    name: string
    index: number
}

export interface ICategoryUpdate {
    id: string
    name: string
    index: number
}

export interface ICategoryId extends Pick<ICategory, "id"> {}

export interface ISubcategory {
    id: string
    name: string
    minScore: number
    maxScore: number
}

export interface ISubcategoryResponse extends IBaseRespone {
    data: ISubcategory[]
}

export interface ISubcategoryCreate {
    name: string
    minScore: number
    maxScore: number
    categoryIndex: number
}

export interface ISubcategoryUpdate extends ISubcategoryId {
    name: string
    minScore: number
    maxScore: number
}

export interface ISubcategoryId extends Pick<ISubcategory, "id"> {}
