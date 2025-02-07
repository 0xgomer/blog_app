import {createSlice} from "@reduxjs/toolkit";

export interface AlertState {
    error: string | null;
    success: string | null;
    loading: boolean;
}

const initialState: AlertState = {
    error: null,
    success: null,
    loading: false
}

export const alertReducer = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setError (state, payload) {
            state.error = payload.payload
        },
        setSuccess (state, payload) {
            state.success = payload.payload
        },
        closeError (state) {
            state.error = null
        },
        closeSuccess (state) {
            state.success = null
        },
        setLoading (state, payload) {
            state.loading = payload.payload
        }
    },
})

export const {setSuccess, setError, closeError, closeSuccess, setLoading}  = alertReducer.actions
export default alertReducer.reducer