import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { fetchPostsAndUsers } from '../services/api'
import { makeFakeDate, randomStatus } from '../utils/faker'


export const loadProjects = createAsyncThunk('projects/load', async () => {
const { posts, users } = await fetchPostsAndUsers()
return posts.slice(0, 50).map((p) => {
const owner = users.find(u => u.id === p.userId)
return {
id: p.id,
title: p.title,
description: p.body,
owner: owner ? owner.name : 'Unknown',
status: randomStatus(),
createdAt: makeFakeDate(),
}
})
})


const projectsSlice = createSlice({
name: 'projects',
initialState: { items: [], status: 'idle', error: null },
reducers: {
addProject: {
reducer: (state, action) => { state.items.push(action.payload) },
prepare: (data) => ({
payload: {
id: nanoid(),
title: data.title,
description: data.description,
owner: data.owner,
status: data.status,
createdAt: new Date().toISOString(),
}
})
},
updateStatus: (state, action) => {
const { id, status } = action.payload
const found = state.items.find(p => p.id === id)
if (found) found.status = status
}
},
extraReducers: (builder) => {
builder
.addCase(loadProjects.pending, (state) => { state.status = 'loading' })
.addCase(loadProjects.fulfilled, (state, action) => {
state.items = action.payload
state.status = 'succeeded'
})
.addCase(loadProjects.rejected, (state, action) => {
state.status = 'failed'
state.error = action.error.message
})
}
})


export const { addProject, updateStatus } = projectsSlice.actions
export default projectsSlice.reducer