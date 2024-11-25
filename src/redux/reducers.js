import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todos',
    initialState: { copmleted :false},
    reducers: {
        pushNotification(state, action) {
            state.copmleted=true
        },
        popNotification(state, action) {
            state.copmleted = false
        },
       
    },
})

const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo:null,isInternet:typeof window !== 'undefined'? navigator?.onLine:true},
    reducers: {
        LogInReducer(state, action) {
            state.userInfo=action.payload
        },
        LogOutReducer(state, action) {
            state.userInfo=null
        },
        HandleInternetStatus(state,action){
            state.isInternet=action.payload
        }
       
    },
})

export const {LogInReducer,LogOutReducer,HandleInternetStatus} =userSlice.actions
export const { pushNotification, popNotification } = todosSlice.actions
export const todos = todosSlice.reducer
export const user = userSlice.reducer