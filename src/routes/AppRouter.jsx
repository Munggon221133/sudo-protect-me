import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'

const Login = lazy(() => import('../pages/Login.jsx'))
const Signup = lazy(() => import('../pages/Signup.jsx'))
const ResetPassword = lazy(() => import('../pages/ResetPassword.jsx'))
const Home = lazy(() => import('../pages/Home.jsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'))
const Report = lazy(() => import('../pages/Report.jsx'))
const Profile = lazy(() => import('../pages/Profile.jsx'))

export default function AppRouter() {
    return (
        <Router>
            <Suspense fallback={<div className="container">Loading…</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route element={<MainLayout />}>
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/report"
                            element={
                                <ProtectedRoute>
                                    <Report />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}