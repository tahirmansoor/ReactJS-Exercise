import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({ children }) {
const isAuthed = useSelector(s => s.auth.isAuthenticated)
if (!isAuthed) return <Navigate to="/login" replace />
return children
}