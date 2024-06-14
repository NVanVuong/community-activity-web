import { IComment } from "@/interfaces/proof.interface"
import { formatDate } from "@/utils/helpers"

function Comment(comment: IComment) {
    const { user, createdAt, content } = comment
    return (
        <div>
            <div className="flex items-center gap-2">
                <img className="h-12 w-12 rounded-full" src={user.avatar} alt={user.name} />
                <div className="flex flex-col">
                    <p className="text-sm font-medium">{user.name}</p>
                    <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
                </div>
            </div>
            <span>{content}</span>
        </div>
    )
}
export default Comment
