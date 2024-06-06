import { Avatar, Dropdown, MenuProps } from "antd"
import { MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md"
import { BiUser } from "react-icons/bi"
import { signOut } from "@/redux/features/auth/auth.slice"
import { MdOutlineMenu } from "react-icons/md"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HiLogin } from "react-icons/hi"
import { AvatarDefault } from "@/assets/images"
import useAuth from "@/hooks/useAuth"
import { SITE_MAP } from "@/utils/enums/path.enum"
import { ItemType } from "antd/es/menu/interface"
import { useAppDispatch } from "@/redux/hook"

const UserMenu = () => {
    const { user, isAuth } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "profile":
                navigate(SITE_MAP.MY_PROFILE)

                break
            case "admin":
                navigate(SITE_MAP.ADMIN)
                break
            case "signout":
                dispatch(signOut())
                navigate(SITE_MAP.INDEX)
                break
            case "signin":
                navigate(SITE_MAP.SIGNIN)
                break
            default:
                break
        }
    }

    const itemsUser: ItemType[] = [
        {
            key: "profile",
            label: "My Profile",
            icon: <BiUser className="mr-4 h-4 w-4" />
        },
        {
            key: "admin",
            label: "Admin",
            icon: <MdOutlineAdminPanelSettings className="mr-4 h-4 w-4" />
        },
        {
            type: "divider"
        },
        {
            key: "signout",
            label: "Sign Out",
            icon: <MdLogout className="mr-4 h-4 w-4" />
        }
    ].filter(Boolean) as ItemType[]

    const itemGuest: MenuProps["items"] = [
        {
            key: "signin",
            label: "Sign In",
            icon: <HiLogin className="mr-4 h-4 w-4" />
        }
    ]

    const items = isAuth ? itemsUser : itemGuest

    return (
        <Dropdown
            className={`relative flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-2 transition duration-200 hover:shadow-xl ${
                isOpen ? "shadow-xl" : "shadow-none"
            }`}
            placement="bottomRight"
            menu={{ items, onClick }}
            trigger={["click"]}
            arrow
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <div>
                <MdOutlineMenu className="h-5 w-5" />
                <Avatar className="cursor-pointer" src={user ? user.avatar : AvatarDefault} size={36} />
            </div>
        </Dropdown>
    )
}

export default UserMenu
