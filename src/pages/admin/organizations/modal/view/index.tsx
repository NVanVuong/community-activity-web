import { IModal } from "@/redux/features/modal/modal.slice"
import Title from "@/components/molecules/title-modal"
import SubcategoriesList from "../../subcategories"

const ViewSubcategory = (props: IModal) => {
    return (
        <div className="w-192">
            <Title>{props.title}</Title>
            <SubcategoriesList subcategories={props.data.subcategories} />
        </div>
    )
}

export default ViewSubcategory
