import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/enums/path.enum"

function ForbiddenPage() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen items-center justify-center">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button onClick={() => navigate(SITE_MAP.INDEX)} type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    )
}

export default ForbiddenPage
