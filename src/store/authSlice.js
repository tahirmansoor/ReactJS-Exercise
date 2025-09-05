import { createSlice } from '@reduxjs/toolkit'


const initialState = {
user: null,
isAuthenticated: false,
error: null,
}


const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
login: (state, action) => {
const { username, password } = action.payload
if (username === 'admin' && password === 'admin') {
state.user = { username }
state.isAuthenticated = true
state.error = null
} else {
state.error = 'Invalid credentials'
state.isAuthenticated = false
state.user = null
}
},
logout: (state) => {
state.user = null
state.isAuthenticated = false
state.error = null
},
clearError: (state) => { state.error = null }
}
})


export const { login, logout, clearError } = authSlice.actions
export default authSlice.reducer