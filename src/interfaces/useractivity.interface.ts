import { USER_ACTIVITY_STATUS } from "@/utils/enums/status.enum"
import { IActivity } from "./activity.interface"
import { IUser } from "./user.interface"

export interface IUserActivity {
    id: string
    activity: IActivity
    user: IUser
    status: USER_ACTIVITY_STATUS
}
