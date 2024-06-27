import Slider from "@/components/organisms/slider"
import { Outlet } from "react-router-dom"

const Faculty = () => {
    return (
        <div className="flex h-screen overflow-y-hidden">
            <Slider />
            <div className="h-full w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Faculty
