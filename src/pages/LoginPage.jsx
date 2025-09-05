import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Paper, Typography, Alert } from '@mui/material'


export default function LoginPage() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const dispatch = useDispatch()
const error = useSelector(s => s.auth.error)
const isAuthed = useSelector(s => s.auth.isAuthenticated)
const navigate = useNavigate()


useEffect(() => { if (isAuthed) navigate('/dashboard') }, [isAuthed, navigate])


useEffect(() => () => { dispatch(clearError()) }, [dispatch])


const onSubmit = (e) => {
e.preventDefault()
dispatch(login({ username, password }))
}


return (
<Box display="flex" justifyContent="center" mt={8}>
<Paper sx={{ p: 4, width: 360 }}>
<Typography variant="h6" mb={2}>Login</Typography>
{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
<form onSubmit={onSubmit}>
<TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
<TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
<Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Sign In</Button>
</form>
</Paper>
</Box>
)
}