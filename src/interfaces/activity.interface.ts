import { ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { IBaseQuery, IBaseRespone } from "./base.interface"
import { ISubcategory } from "./categories.interface"
import { IUserActivity } from "./useractivity.interface"

export interface IActivity {
    id: string
    name: string
    score: number
    description: string
    image: string
    maxParticipants: number
    participants: number
    address: string
    organizer: string
    startDate: Date
    endDate: Date
    startRegistration: Date
    endRegistration: Date
    isExternal: boolean
    status: ACTIVITY_STATUS
    subcategory: ISubcategory
    userActivities: IUserActivity[]
}

export interface IActivityQuery extends IBaseQuery {}

export interface IActivityResponse extends IBaseRespone {
    data: IActivity[]
}

export interface IActivityCreateRequest extends FormData {}

export interface IActivityUpdateRequest {
    id: string
    formData: FormData
}

export interface IActivityId extends Pick<IActivity, "id"> {}
