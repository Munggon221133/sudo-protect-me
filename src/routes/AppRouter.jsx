import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'

const Login = lazy(() => import('../pages/Login.jsx'))
const Signup = lazy(() => import('../pages/Signup.jsx'))
const Home = lazy(() => import('../pages/Home.jsx'))

export default function AppRouter() {
    return (
        <Router>
            <Suspense fallback={<div className="container">Loading…</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route element={<MainLayout />}>
                        <Route
                            path="/Home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}