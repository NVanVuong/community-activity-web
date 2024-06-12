import useAuth from "@/hooks/useAuth"
import ForbiddenPage from "@/pages/error/forbidden"
import { SITE_MAP } from "@/utils/enums/path.enum"
import { ROLE } from "@/utils/enums/role.enum"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
    requiredRole?: ROLE
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
    const { user, isAuth, role } = useAuth()

    if (!isAuth || !user) {
        return <Navigate to={SITE_MAP.SIGNIN} replace />
    }

    if (requiredRole && role !== requiredRole) {
        return <ForbiddenPage />
    }

    return <Outlet />
}

export default ProtectedRoute
