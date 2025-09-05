import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './store/authSlice'
import ProtectedRoute from './routes/ProtectedRoute'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'


const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Analytics = lazy(() => import('./pages/Analytics'))


export default function App() {
  const dispatch = useDispatch()
  const isAuthed = useSelector(s => s.auth.isAuthenticated)
  const navigate = useNavigate()


  const handleLogout = () => { dispatch(logout()); navigate('/login') }


  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PM Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
          {isAuthed ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>


      <Box p={2}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/projects/:id" element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </Suspense>
      </Box>
    </>
  )
}