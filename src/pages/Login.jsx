import { useNavigate, useLocation, Link } from 'react-router-dom'
import { setToken } from '../lib/storage'
import { useState, useEffect } from 'react'
import trueLogo from '../assets/true_logo.png'
import '../styles/Login.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state?.signupSuccess) {
            setMsg('Account created! You can log in now.')
        }
    }, [location.state])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (loading) return

        setErr(null)
        setMsg(null)

        if (!email || !password) {
            setErr('Please enter email and password')
            return
        }

        try {
            setLoading(true)

            const res = await fetch(`${API_BASE}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.message || 'Login failed')
            }

            // You can replace this with the real token from `data`
            setToken('demo-token')
            navigate('/Home', { replace: true })
        } catch (e) {
            setErr(e.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={trueLogo} alt="true" className="login-logo" />

                <div className="login-card">
                    {err && (
                        <div className="login-alert login-alert-error">
                            {err}
                        </div>
                    )}
                    {msg && (
                        <div className="login-alert login-alert-success">
                            {msg}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="login-form" noValidate>
                        <label className="login-label">
                            Username or Email
                            <input
                                className="login-input"
                                placeholder="Enter Username or Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </label>

                        <label className="login-label">
                            Password
                            <input
                                className="login-input"
                                placeholder="Enter Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </label>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <Link to="/signup" className="login-footer-link">
                            Don’t have an account?
                        </Link>
                        <button
                            type="button"
                            className="login-footer-link login-footer-link-button"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
