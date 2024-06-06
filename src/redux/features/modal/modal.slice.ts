import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IModal {
    isOpen?: boolean
    type?: any
    id?: any
    data?: any
    title?: string
    isActive?: boolean
}

export interface IOpenModalPayload {
    type?: any
    id?: string | number
    data?: any
}

const initialState: IModal = {
    isOpen: false,
    type: null,
    id: null,
    data: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IOpenModalPayload>) => {
            state.isOpen = true
            state.type = action.payload.type
            state.id = action.payload.id
            state.data = action.payload.data
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = null
            state.id = null
            state.data = null
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
