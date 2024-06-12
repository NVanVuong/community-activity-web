import { BackgroundActivity, LogoFull } from "@/assets/images"
import useServerMessage from "@/hooks/useServerMessage"
import { IAuthSignIn } from "@/interfaces/auth.interface"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import { useSignInMutation } from "@/redux/services/auth/auth.service"
import { SITE_MAP } from "@/utils/enums/path.enum"
import { Form, Input, Button } from "antd"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [signIn, { data, error, isLoading }] = useSignInMutation()

    const onFinish = async (values: IAuthSignIn) => {
        const res = await signIn(values).unwrap()
        if (res.success) {
            dispatch(setCredentials({ accessToken: res.data.accessToken }))
            navigate(SITE_MAP.INDEX)
        }
    }

    useServerMessage({ data, error })

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary/20">
            <div className="flex overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="flex w-112 flex-col items-center justify-center px-6 py-20">
                    <div className="">
                        <img src={BackgroundActivity} alt="Background activity" className="w-96" />
                    </div>
                    <hr className="mb-6 mt-8 w-4/5 border border-gray-300" />
                    <h2 className="text-2xl font-bold text-primary">Community Activities</h2>
                    <p className="mt-2 text-center text-sm font-bold text-gray-400/80">
                        Discover and manage activities effortlessly.
                        <br /> Easily find and oversee your own.
                    </p>
                </div>
                <div className="flex h-auto w-112 flex-col items-center justify-center bg-primary/10">
                    <img src={LogoFull} alt="Logo" className="mb-8 h-16" />
                    <h2 className="mb-2 text-center text-2xl font-bold uppercase text-secondary">Sign In</h2>
                    <Form name="sign_in" className="w-80" layout="vertical" onFinish={onFinish} requiredMark={false}>
                        <Form.Item
                            name="username"
                            label={<span style={{ fontWeight: "bold" }}>Username</span>}
                            rules={[{ required: true, message: "Please input your username!" }]}
                        >
                            <Input placeholder="Enter the username" className="h-10" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<span style={{ fontWeight: "bold" }}>Password</span>}
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder="Enter the password" className="h-10" />
                        </Form.Item>
                        <div className=" mb-4 text-right">
                            <a href="/" className=" text-sm text-primary">
                                Forgot password?
                            </a>
                        </div>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="h-10 w-full bg-secondary hover:bg-secondary/90"
                                loading={isLoading}
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
