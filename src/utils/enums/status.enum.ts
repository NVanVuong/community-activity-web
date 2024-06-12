export enum USER_ACTIVITY_STATUS {
    REGISTERED = "registered",
    CANCELED = "canceled",
    SUBMITTED = "submitted",
    APPROVED = "approved",
    REJECTED = "rejected"
}

export const USER_ACTIVITY_STATUS_COLOR: { [key in USER_ACTIVITY_STATUS]: string } = {
    [USER_ACTIVITY_STATUS.REGISTERED]: "lime",
    [USER_ACTIVITY_STATUS.CANCELED]: "orange",
    [USER_ACTIVITY_STATUS.SUBMITTED]: "cyan",
    [USER_ACTIVITY_STATUS.APPROVED]: "green",
    [USER_ACTIVITY_STATUS.REJECTED]: "red"
}

export const USER_ACTIVITY_STATUS_TEXT: { [key in USER_ACTIVITY_STATUS]: string } = {
    [USER_ACTIVITY_STATUS.REGISTERED]: "Registered",
    [USER_ACTIVITY_STATUS.CANCELED]: "Canceled",
    [USER_ACTIVITY_STATUS.SUBMITTED]: "Submitted",
    [USER_ACTIVITY_STATUS.APPROVED]: "Approved",
    [USER_ACTIVITY_STATUS.REJECTED]: "Rejected"
}

export type UserActivityStatusType = keyof typeof USER_ACTIVITY_STATUS_COLOR

export enum ACTIVITY_STATUS {
    REGISTRATION_EXPIRED = "registration_expired",
    REGISTRATION_OPEN = "registration_open",
    COMPLETED = "completed",
    REGISTERED = "registered",
    FULL = "full"
}

export const ACTIVITY_STATUS_COLOR: { [key in ACTIVITY_STATUS]: string } = {
    [ACTIVITY_STATUS.REGISTRATION_EXPIRED]: "volcano",
    [ACTIVITY_STATUS.REGISTRATION_OPEN]: "gold",
    [ACTIVITY_STATUS.REGISTERED]: "green",
    [ACTIVITY_STATUS.COMPLETED]: "cyan",
    [ACTIVITY_STATUS.FULL]: "red"
}

export const ACTIVITY_STATUS_TEXT: { [key in ACTIVITY_STATUS]: string } = {
    [ACTIVITY_STATUS.REGISTRATION_EXPIRED]: "Registration expired",
    [ACTIVITY_STATUS.REGISTRATION_OPEN]: "Registration open",
    [ACTIVITY_STATUS.COMPLETED]: "Completed",
    [ACTIVITY_STATUS.REGISTERED]: "Registered",
    [ACTIVITY_STATUS.FULL]: "Full"
}

export type ActivityStatusType = keyof typeof ACTIVITY_STATUS_COLOR
