import Filter from "./filter"
import NavBar from "./navbar"
import Search from "./search"

function Toolbar() {
    return (
        <div className="flex items-center justify-between">
            <NavBar />
            <div className="flex items-center gap-4">
                <Filter />
                <Search />
            </div>
        </div>
    )
}

export default Toolbar
