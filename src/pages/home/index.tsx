import Header from "@/components/organisms/header"
import { Outlet } from "react-router-dom"

function Home() {
    return (
        <div>
            <Header />

            <Outlet />
        </div>
    )
}

export default Home
