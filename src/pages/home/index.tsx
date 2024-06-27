import { Outlet, useNavigate } from "react-router-dom"
import Slider from "./components/slider"
import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { SITE_MAP } from "@/utils/enums/path.enum"
import { ROLE } from "@/utils/enums/role.enum"

function Home() {
    const { role } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        switch (role) {
            case ROLE.ADMIN:
                navigate(SITE_MAP.ADMIN)
                break
            case ROLE.USER:
                navigate(SITE_MAP.INDEX)
                break
            case ROLE.FACULTY:
                navigate(SITE_MAP.FACULTY)
                break
            default:
                navigate(SITE_MAP.SIGNIN)
                break
        }
    }, [role])

    return (
        <div className="flex h-screen overflow-hidden bg-[rgba(81,172,228,0.06)]">
            <Slider />
            <div className="h-screen flex-grow overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Home
