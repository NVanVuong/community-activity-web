import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaRegUser } from "react-icons/fa"
import { BiCategory } from "react-icons/bi"
import { MdLogout, MdOutlineClass, MdOutlineHomeWork, MdOutlineRoomPreferences } from "react-icons/md"
import { LuActivitySquare, LuFileCheck2 } from "react-icons/lu"
import { SITE_MAP } from "@/utils/enums/path.enum"
import Logo from "@/components/molecules/logo"
import Button from "@/components/atoms/button"
import ToggleExpand from "@/components/atoms/expand"
import { LiaUserShieldSolid } from "react-icons/lia"
import { ROLE } from "@/utils/enums/role.enum"
import useAuth from "@/hooks/useAuth"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

const roleMenuMap: Record<ROLE, string[]> = {
    [ROLE.ADMIN]: ["users", "classes", "faculties", "activities", "proofs", "categories", "organizations", "roles"],
    [ROLE.YOUTH_UNION]: [
        "users",
        "classes",
        "faculties",
        "activities",
        "proofs",
        "categories",
        "organizations",
        "roles"
    ],
    [ROLE.FACULTY]: ["users", "classes", "activities", "proofs"],
    [ROLE.UNION_BRANCH]: ["users", "classes", "activities", "proofs"],
    [ROLE.CLASS]: ["users", "activities", "proofs"],
    [ROLE.USER]: []
}

const Slider = () => {
    const [isExpanding, setIsExpanding] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()

    const { role } = useAuth()
    const allowedMenuItems = roleMenuMap[role] || []

    const items: MenuProps["items"] = [
        { type: "divider" },
        ...allowedMenuItems
            .map((key) => {
                switch (key) {
                    case "users":
                        return getItem(`${isExpanding ? "Users" : ""}`, "users", <FaRegUser className="h-5 w-5" />)
                    case "classes":
                        return getItem(
                            `${isExpanding ? "Classes" : ""}`,
                            "classes",
                            <MdOutlineClass className="h-5 w-5" />
                        )
                    case "faculties":
                        return getItem(
                            `${isExpanding ? "Faculties" : ""}`,
                            "faculties",
                            <MdOutlineRoomPreferences className="h-5 w-5" />
                        )
                    case "activities":
                        return getItem(
                            `${isExpanding ? "Activities" : ""}`,
                            "activities",
                            <LuActivitySquare className="h-5 w-5" />
                        )
                    case "proofs":
                        return getItem(`${isExpanding ? "Proofs" : ""}`, "proofs", <LuFileCheck2 className="h-5 w-5" />)
                    case "categories":
                        return getItem(
                            `${isExpanding ? "Categories" : ""}`,
                            "categories",
                            <BiCategory className="h-5 w-5" />
                        )
                    case "organizations":
                        return getItem(
                            `${isExpanding ? "Organization" : ""}`,
                            "organizations",
                            <MdOutlineHomeWork className="h-5 w-5" />
                        )
                    case "roles":
                        return getItem(
                            `${isExpanding ? "Roles" : ""}`,
                            "roles",
                            <LiaUserShieldSolid className="h-5 w-5" />
                        )
                    default:
                        return null
                }
            })
            .filter(Boolean),
        { type: "divider" }
    ]

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "users":
                navigate(SITE_MAP.USERS)
                break
            case "classes":
                navigate(SITE_MAP.CLASSES)
                break
            case "faculties":
                navigate(SITE_MAP.FACULTIES)
                break
            case "activities":
                navigate(SITE_MAP.ACTIVITIES)
                break
            case "categories":
                navigate(SITE_MAP.CATEGORIES)
                break
            case "proofs":
                navigate(SITE_MAP.PROOFS)
                break
            case "organizations":
                navigate(SITE_MAP.ORGANIZATIONS)
                break
            case "roles":
                navigate(SITE_MAP.ROLES)
                break
            default:
                break
        }
    }

    return (
        <div
            className={`${
                isExpanding ? "w-52" : "w-20"
            } trasition relative flex h-screen flex-col items-center rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white duration-200 peer-hover:bg-red-500`}
        >
            <div className="h-20 py-4">
                <Logo isOpen={isExpanding} />
            </div>

            <Menu
                onClick={onClick}
                defaultSelectedKeys={[location.pathname.split("/")[2]]}
                mode="inline"
                items={items}
                style={{ borderInlineEnd: "none" }}
                className={`w-full rounded-br-3xl rounded-tr-3xl border-none`}
            />

            <div className="absolute bottom-4 w-full px-2">
                <Button
                    onClick={() => navigate(SITE_MAP.INDEX)}
                    className="w-full rounded-xl bg-primary py-2.5 text-white shadow-md shadow-primary/60 transition duration-150 hover:shadow-md hover:shadow-primary/90"
                >
                    <MdLogout className="h-5 w-5" /> {isExpanding ? "Logout" : ""}
                </Button>
            </div>

            <ToggleExpand isExpanding={isExpanding} onClick={() => setIsExpanding(!isExpanding)} />
        </div>
    )
}

export default Slider
