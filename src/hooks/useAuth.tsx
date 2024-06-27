import { useAppSelector } from "@/redux/hook"
import { useGetMyInfoQuery } from "@/redux/services/users/users.service"
import { ROLE } from "@/utils/enums/role.enum"

const useAuth = () => {
    const user = useAppSelector((state) => state.auth.user)

    const { data: myInfo } = useGetMyInfoQuery()
    const faculty = myInfo?.data?.user?.clazz?.faculty?.name as string

    const isAuth = !!user

    const role = user?.role as ROLE

    return { isAuth, role, user, faculty }
}

export default useAuth
