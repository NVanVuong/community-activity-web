import { useLocation } from "react-router-dom"
import { useAppDispatch } from "@/redux/hook"
import { useCallback, useEffect } from "react"
import { resetKeyword, setKeyword } from "@/redux/features/search/search.slice"
import { debounce } from "lodash"

const Search = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            dispatch(setKeyword(value))
        }, 1000),
        []
    )

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        debouncedSearch(target.value)
    }

    useEffect(() => {
        dispatch(resetKeyword())
        return () => {
            debouncedSearch.cancel()
        }
    }, [location, debouncedSearch, dispatch])

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-52">
            <div className="relative">
                <input
                    type="input"
                    className="block w-full rounded-full bg-white p-2 pl-3 text-sm font-medium text-primary shadow outline-none transition duration-100 placeholder:text-sm placeholder:text-black/60 hover:placeholder:text-black focus:shadow-lg focus:ring-2 focus:ring-primary focus:placeholder:text-black"
                    placeholder="Search activity"
                    required
                    onChange={handleSearch}
                />
                <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
                    <svg
                        className="h-4 w-4 text-black transition-all duration-100 hover:scale-110 hover:text-primary"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
            </div>
        </form>
    )
}

export default Search
