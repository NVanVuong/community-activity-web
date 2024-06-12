import { USER_ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { IActivity } from "./activity.interface"
import { IUser } from "./user.interface"
import { IBaseQuery, IBaseRespone } from "./base.interface"

export interface IUserActivity {
    id: string
    activity: IActivity
    user: IUser
    status: USER_ACTIVITY_STATUS
}

export interface IUserActivityQuery extends IBaseQuery {}

export interface IUserActivityResponse extends IBaseRespone {
    data: IUserActivity[]
}
