import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser, IUserAuth} from "../../types";
import AuthService from "../../services/AuthService.ts";
import {AxiosError} from "axios";
import {RootState} from "../index.ts";

export interface UserState {
    isLogin: boolean
    user: IUser | null
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    isLogin: false,
    user: null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk<IUserAuth,{email: string, password: string},{state: RootState}>(
    'user/login',
    async ({email, password}: {email: string, password: string}) => {
        try {
            const response = await AuthService.login({email, password})

            localStorage.setItem('token', response.data.accessToken)

            return response.data
        } catch (error) {
            const err = error as AxiosError
            throw err?.response?.data
        }
    }
)

export const registrationUser = createAsyncThunk<IUserAuth, {data: FormData},{state: RootState}>(
    'user/registration',
    async ({data}: {data: FormData}) => {
        try {
            const response = await AuthService.registration(data)

            localStorage.setItem('token', response.data.accessToken)

            return response.data
        } catch (error) {
            const err = error as AxiosError
            throw err?.response?.data
        }
    }
)

export const logoutUser = createAsyncThunk<void, void, {state: RootState}>(
    'user/logout',
    async () => {
        try {
            const response = await AuthService.logout()

            localStorage.removeItem('token')

            return response.data
        } catch (error) {
            const err = error as AxiosError
            throw err?.response?.data
        }
    }
)

export const refreshUser = createAsyncThunk<IUserAuth, void, {state: RootState}>(
    'user/refresh',
    async () => {
        try {
            const response = await AuthService.refresh()

            localStorage.setItem('token', response.data.accessToken)

            return response.data
        } catch (error) {
            const err = error as AxiosError
            throw err?.response?.data
        }
    }
)

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        //login
            builder.addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
            })
            builder.addCase(loginUser.fulfilled, (state, action:PayloadAction<IUserAuth>) => {
                state.loading = false
                state.user = action?.payload?.user || null
                state.isLogin = true
            })



            //registration
            builder.addCase(registrationUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(registrationUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
            })
            builder.addCase(registrationUser.fulfilled, (state, action:PayloadAction<IUserAuth>) => {
                state.loading = false
                state.user = action?.payload?.user || null
                state.isLogin = true
            })



            //logout
            builder.addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
            })
            builder.addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.isLogin = false
            })


            //refresh
            builder.addCase(refreshUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            builder.addCase(refreshUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || null
            })
            builder.addCase(refreshUser.fulfilled, (state, action:PayloadAction<IUserAuth>) => {
                state.loading = false
                state.user = action.payload.user
                state.isLogin = true
            })
        }
    })

export const {clearError}  = userReducer.actions
export default userReducer.reducer