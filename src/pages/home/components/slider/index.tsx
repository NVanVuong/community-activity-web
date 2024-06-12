import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useNavigate } from "react-router-dom"
import { MdKeyboardDoubleArrowRight, MdLogout } from "react-icons/md"
import { LuActivitySquare, LuFileCheck2 } from "react-icons/lu"
import { SITE_MAP } from "@/utils/enums/path.enum"
import Logo from "@/components/molecules/logo"
import { PiListHeartBold } from "react-icons/pi"
import { CgList } from "react-icons/cg"
import useAuth from "@/hooks/useAuth"
import { useAppDispatch } from "@/redux/hook"
import { signOut } from "@/redux/features/auth/auth.slice"

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

const Slider = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAuth()

    let items: MenuProps["items"] = [
        getItem("Activities", "activities", <CgList className="h-5 w-9 pl-4" />),

        { type: "divider" },

        getItem("My Favorites", "my-favorites", <PiListHeartBold className="h-5 w-9 pl-4" />),
        getItem("My Activities", "my-activities", <LuActivitySquare className="h-5 w-9 pl-4" />),
        getItem("My Proofs", "my-proofs", <LuFileCheck2 className="h-5 w-9 pl-4" />)
    ]

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "activities":
                navigate(SITE_MAP.INDEX)
                break

            case "my-favorites":
                navigate(SITE_MAP.MY_FAVORITES)
                break

            case "my-activities":
                navigate(SITE_MAP.MY_ACTIVITIES)
                break

            case "my-proofs":
                navigate(SITE_MAP.MY_PROOFS)
                break

            default:
                break
        }
    }

    return (
        <div className="relative flex h-screen w-60 flex-col items-center justify-between px-6">
            <div>
                <div className="flex justify-center py-6">
                    <Logo isOpen={true} />
                </div>

                <Menu
                    onClick={onClick}
                    defaultSelectedKeys={["activities"]}
                    mode="inline"
                    items={items}
                    style={{ borderInlineEnd: "none" }}
                    className="silder-header w-48"
                />
            </div>

            {isAuth && (
                <div className="mb-6 flex w-full flex-col gap-2">
                    <div className="flex h-fit w-full items-start">
                        <div onClick={() => navigate(SITE_MAP.MY_PROFILE)} className="group relative w-16">
                            <button className="absolute top-0 flex items-center gap-1 whitespace-nowrap text-sm font-medium text-primary opacity-0 transition-all duration-200 group-hover:translate-x-16 group-hover:opacity-100">
                                View profile <MdKeyboardDoubleArrowRight className="h-4 w-4" />
                            </button>
                            <img
                                className="h-16 w-16 rounded-md hover:cursor-pointer"
                                src={user?.avatar}
                                alt={user?.name}
                            />
                            <p className="absolute -bottom-1 -right-12 w-fit rounded-3xl bg-white px-3 py-1 text-xs font-medium capitalize text-primary shadow-md hover:cursor-pointer">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                    <p
                        onClick={() => navigate(SITE_MAP.MY_PROFILE)}
                        className="text-sm font-medium hover:cursor-pointer"
                    >
                        {user?.name}
                    </p>

                    <button
                        onClick={() => {
                            navigate(SITE_MAP.SIGNIN)
                            dispatch(signOut())
                        }}
                        className="flex items-center gap-2 rounded-md text-sm font-medium text-primary transition duration-150 hover:underline hover:underline-offset-1 hover:drop-shadow-md"
                    >
                        Sign out <MdLogout className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Slider
