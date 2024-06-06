import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import { IAuth } from "../../../interfaces/auth.interface"
import { IUser } from "../../../interfaces/user.interface"

const token = localStorage.getItem("jwt") || ""
let decodedToken: IUser | null = null

if (token) {
    try {
        decodedToken = jwtDecode(token) as IUser
    } catch (error) {
        console.error("Error decoding token:", error)
    }
}

const initialState: IAuth = {
    accessToken: token,
    user: decodedToken
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload
            state.accessToken = accessToken
            state.user = accessToken ? jwtDecode(accessToken) : null
            localStorage.setItem("jwt", accessToken || "")
        },

        signOut: (state) => {
            state.accessToken = null
            state.user = null
            localStorage.removeItem("jwt")
        }
    }
})

export const { setCredentials, signOut } = authSlice.actions

export default authSlice.reducer
