import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { SITE_MAP } from "@/utils/enums/path.enum"
import Loading from "@/components/atoms/loading"
import { ROLE } from "@/utils/enums/role.enum"
import ProtectedRoute from "@/guards/protected-route"

const SignInPage = lazy(() => import("../pages/auth"))
const HomePage = lazy(() => import("../pages/home"))
const MyProfilePage = lazy(() => import("../pages/home/my-profile"))
const ListActivitiesPage = lazy(() => import("../pages/home/activities"))
const MyActivitiesPage = lazy(() => import("../pages/home/my-activities"))
const MyProofsPage = lazy(() => import("../pages/home/my-proofs"))
const AdminPage = lazy(() => import("../pages/admin"))
const UsersPage = lazy(() => import("../pages/admin/users"))
const ClassesPage = lazy(() => import("../pages/admin/classes"))
const FacultiesPage = lazy(() => import("../pages/admin/faculties"))
const CategoriesPage = lazy(() => import("../pages/admin/categories"))
const ActivitiesPage = lazy(() => import("../pages/admin/activities"))
const ProofsPage = lazy(() => import("../pages/admin/proofs"))

const ForbiddenPage = lazy(() => import("../pages/error/forbidden"))
const NotFoundPage = lazy(() => import("../pages/error/not-found"))

const MainRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path={SITE_MAP.INDEX} element={<HomePage />}>
                            <Route index element={<ListActivitiesPage />} />
                            <Route path={SITE_MAP.MY_ACTIVITIES} element={<MyActivitiesPage />} />
                            <Route path={SITE_MAP.MY_PROOFS} element={<MyProofsPage />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute requiredRole={ROLE.ADMIN} />}>
                        <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                            <Route index element={<Navigate to={SITE_MAP.USERS} replace />} />
                            <Route path={SITE_MAP.USERS} element={<UsersPage />} />
                            <Route path={SITE_MAP.CLASSES} element={<ClassesPage />} />
                            <Route path={SITE_MAP.FACULTIES} element={<FacultiesPage />} />
                            <Route path={SITE_MAP.CATEGORIES} element={<CategoriesPage />} />
                            <Route path={SITE_MAP.ACTIVITIES} element={<ActivitiesPage />} />
                            <Route path={SITE_MAP.PROOFS} element={<ProofsPage />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path={SITE_MAP.MY_PROFILE} element={<MyProfilePage />} />
                    </Route>

                    <Route path={SITE_MAP.SIGNIN} element={<SignInPage />} />
                    <Route path={SITE_MAP.FORBIDDEN} element={<ForbiddenPage />} />
                    <Route path={SITE_MAP.NOT_FOUND} element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default MainRoute
