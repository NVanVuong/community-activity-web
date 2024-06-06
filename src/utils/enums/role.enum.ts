export enum ROLE {
    USER = "user",
    CLASS = "class",
    FACULTY = "faculty",
    ADMIN = "admin"
}

export const ROLE_COLORS = {
    [ROLE.USER]: "#5DADE2",
    [ROLE.CLASS]: "#2874A6",
    [ROLE.FACULTY]: "#1B4F72",
    [ROLE.ADMIN]: "#51ACE4"
}

export type RoleType = keyof typeof ROLE_COLORS
