import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../../../utils/constants/global-contants.ts"
import { RootState } from "../../store"
import { IAuthResponse, IAuthSignIn } from "../../../interfaces/auth.interface"

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Access-Control-Allow-Origin", "*")
        headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const createApiWithAuth = (reducerPath: string, tagTypes: Array<string>) =>
    createApi({
        baseQuery: baseQuery,
        endpoints: () => ({}),
        reducerPath: reducerPath,
        tagTypes: tagTypes
    })

const creatApiAuthWithAuth = createApiWithAuth("AuthApi", ["Auth"])

export const authApi = creatApiAuthWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<IAuthResponse, IAuthSignIn>({
            query: (body) => ({
                url: "/auth/signin",
                method: "POST",
                body
            })
        })
    })
})

export const { useSignInMutation } = authApi
