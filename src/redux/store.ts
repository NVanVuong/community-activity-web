import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/auth.slice"
import modalSlice from "./features/modal/modal.slice"
import searchSlice from "./features/search/search.slice"
import filterSlice from "./features/filter/filter.slice"
import { authApi } from "./services/auth/auth.service"
import { userApi } from "./services/users/users.service"
import { classApi } from "./services/classes/classes.service"
import { facultyApi } from "./services/faculties/faculties.service"
import { categoryApi } from "./services/categories/categories.slice"
import { activityApi } from "./services/activities/activities.service"
import { proofApi } from "./services/proofs/proofs.service"

const rootReducer = combineReducers({
    auth: authSlice,
    search: searchSlice,
    modal: modalSlice,
    filter: filterSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [proofApi.reducerPath]: proofApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            classApi.middleware,
            facultyApi.middleware,
            categoryApi.middleware,
            activityApi.middleware,
            proofApi.middleware
        )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
