import { USERACTIVITY_STATUS } from "@/utils/enums/status.enum"

export interface IUserActivity {
    id: string
    activityId: string
    userId: string
    status: USERACTIVITY_STATUS
}
