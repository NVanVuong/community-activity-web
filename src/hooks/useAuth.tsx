import { useAppSelector } from "@/redux/hook"

const useAuth = () => {
    const user = useAppSelector((state) => state.auth.user)



    const isAuth = !!user

    const role = user?.role

    return { isAuth, role, user }
}

export default useAuth
