export enum ROLE {
    USER = "user",
    CLASS = "class",
    FACULTY = "faculty",
    ADMIN = "admin",
    YOUTH_UNION = "youth_union",
    UNION_BRANCH = "union_branch"
}

export const ROLE_COLORS = {
    [ROLE.USER]: "#5DADE2",
    [ROLE.CLASS]: "#2874A6",
    [ROLE.FACULTY]: "#1B4F72",
    [ROLE.ADMIN]: "#51ACE4",
    [ROLE.YOUTH_UNION]: "#F1948A",
    [ROLE.UNION_BRANCH]: "#EC7063"
}

export const ROLE_TEXT: { [key in ROLE]: string } = {
    [ROLE.USER]: "User",
    [ROLE.CLASS]: "Class",
    [ROLE.FACULTY]: "Faculty",
    [ROLE.ADMIN]: "Admin",
    [ROLE.YOUTH_UNION]: "Youth Union",
    [ROLE.UNION_BRANCH]: "Union Branch"
}

export type RoleType = keyof typeof ROLE_COLORS
