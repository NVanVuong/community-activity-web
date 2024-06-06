import Logo from "@/components/molecules/logo"
import UserMenu from "@/components/molecules/user-menu"
import { SITE_MAP } from "@/utils/enums/path.enum"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 200)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const location = useLocation()
    const isHome = location.pathname === SITE_MAP.INDEX

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${isOpen ? "h-24" : "h-16"} ${isSticky ? "bg-white" : isHome ? "bg-transparent" : "bg-white"} 
            fixed top-0 z-[999] flex w-full items-center justify-between px-4 py-3 shadow-md transition-all duration-150 sm:px-6 md:px-10 xl:px-28`}
        >
            <Logo />

            <UserMenu />
        </div>
    )
}

export default Header
