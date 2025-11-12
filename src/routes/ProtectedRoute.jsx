import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
    const { isAuthed } = useAuth()
    const location = useLocation()
    if (!isAuthed) return <Navigate to="/" replace state={{ from: location }} />
    return children
}
