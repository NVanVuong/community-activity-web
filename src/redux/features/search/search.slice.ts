import { createSlice } from "@reduxjs/toolkit"

export interface ISearch {
    keyword: string
    isExternal: boolean
    classId: string
    facultyId: string
    yearId: string
    organization: string
}

const initialState: ISearch = {
    keyword: "",
    isExternal: false,
    classId: "",
    facultyId: "",
    yearId: "",
    organization: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload
        },
        setExternal: (state, action) => {
            state.isExternal = action.payload
        },
        setClassId: (state, action) => {
            state.classId = action.payload
        },
        setFacultyId: (state, action) => {
            state.facultyId = action.payload
        },
        setYearId: (state, action) => {
            state.yearId = action.payload
        },
        setOrganization: (state, action) => {
            state.organization = action.payload
        },
        resetKeyword: (state) => {
            state.keyword = initialState.keyword
        },
        resetExternal: (state) => {
            state.isExternal = initialState.isExternal
        },
        resetClassId: (state) => {
            state.classId = initialState.classId
        },
        resetFacultyId: (state) => {
            state.facultyId = initialState.facultyId
        },
        resetYearId: (state) => {
            state.yearId = initialState.yearId
        },
        resetOrganization: (state) => {
            state.organization = initialState.organization
        }
    }
})

export const {
    setKeyword,
    resetKeyword,
    setExternal,
    resetExternal,
    setClassId,
    resetClassId,
    setFacultyId,
    resetFacultyId,
    setYearId,
    resetYearId,
    setOrganization,
    resetOrganization
} = searchSlice.actions

export default searchSlice.reducer
