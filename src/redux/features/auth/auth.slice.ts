import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import { IAuth } from "../../../interfaces/auth.interface"
import { IUserJwt } from "../../../interfaces/user.interface"

const token = localStorage.getItem("jwt") || ""
let decodedToken: IUserJwt | null = null

if (token) {
    try {
        decodedToken = jwtDecode(token) as IUserJwt
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
            console.log("user", state.user)

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
