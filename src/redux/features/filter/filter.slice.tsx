import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: [] as string[],
    startDate: [],
    score: [3, 30],
    category: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            return {
                ...state,
                ...action.payload,
                startDate: action.payload.startDate.map((date: any) => date.toISOString())
            }
        },
        resetFilters: () => {
            return initialState
        }
    }
})

export const { setFilters, resetFilters } = filterSlice.actions
export default filterSlice.reducer
