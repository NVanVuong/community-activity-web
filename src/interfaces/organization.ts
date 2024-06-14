import { IBaseQuery, IBaseRespone } from "./base.interface"
import { ISubcategory } from "./categories.interface"

export interface IOrganization {
    id: string
    name: string
    subcategories: ISubcategory[]
}

export interface IOrganizationQuery extends IBaseQuery {}

export interface IOrganizationResponse extends IBaseRespone {
    data: IOrganization[]
}

export interface IOrganizationCreate {
    name: string
}

export interface IOrganizationId extends Pick<IOrganization, "id"> {}
