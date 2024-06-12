import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/enums/path.enum"

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen items-center justify-center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={() => navigate(SITE_MAP.INDEX)} type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    )
}

export default NotFoundPage
