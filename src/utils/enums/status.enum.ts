export enum USERACTIVITY_STATUS {
    REGISTERED = "registered",
    CANCELED = "canceled",
    SUBMITTED_PROOF = "submitted_proof",
    APPROVED = "approved",
    REJECTED = "rejected"
}

export const USERACTIVITY_STATUS_COLOR = {
    REGISTERED: "#FFD700",
    CANCELED: "#FF4500",
    SUBMITTED_PROOF: "#00BFFF",
    APPROVED: "#32CD32",
    REJECTED: "#FF0000"
} as const

export const USERACTIVITY_STATUS_TEXT = {
    REGISTERED: "Registered",
    CANCELED: "Canceled",
    SUBMITTED_PROOF: "Submitted Proof",
    APPROVED: "Approved",
    REJECTED: "Rejected"
} as const

export type UserActivityStatusType = keyof typeof USERACTIVITY_STATUS_COLOR

export enum ACTIVITY_STATUS {
    REGISTRATION_EXPIRED = "registration_expired",
    REGISTRATION_OPEN = "registration_open",
    EXPIRED = "expired",
    REGISTERED = "registered"
}

export const ACTIVITY_STATUS_COLOR: { [key in ACTIVITY_STATUS]: string } = {
    [ACTIVITY_STATUS.REGISTRATION_EXPIRED]: "#FF4500",
    [ACTIVITY_STATUS.REGISTRATION_OPEN]: "#FFD700",
    [ACTIVITY_STATUS.EXPIRED]: "#FF0000",
    [ACTIVITY_STATUS.REGISTERED]: "#32CD32"
}

export const ACTIVITY_STATUS_TEXT: { [key in ACTIVITY_STATUS]: string } = {
    [ACTIVITY_STATUS.REGISTRATION_EXPIRED]: "Registration expired",
    [ACTIVITY_STATUS.REGISTRATION_OPEN]: "Registration open",
    [ACTIVITY_STATUS.EXPIRED]: "Expired",
    [ACTIVITY_STATUS.REGISTERED]: "Registered"
}

export type ActivityStatusType = keyof typeof ACTIVITY_STATUS_COLOR
