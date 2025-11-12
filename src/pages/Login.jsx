import { useNavigate, useLocation, Link } from 'react-router-dom'
import { setToken } from '../lib/storage'
import { useState, useEffect } from 'react'
import '../styles/Login.css'

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
        setErr(null)
        setMsg(null)

        if (!email || !password) {
            setErr('Please enter email and password')
            return
        }

        try {
            setLoading(true)
            const res = await fetch(`/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.message || 'Login failed')

            setToken('demo-token')
            navigate('/Home', { replace: true })

        } catch (e) {
            setErr(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={onSubmit} className="login-form">
                <h1>Login</h1>

                <input
                    className="login-input"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    className="login-input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>

                {err && <p style={{ color: '#f87171' }}>{err}</p>}
                {msg && <p style={{ color: '#22c55e' }}>{msg}</p>}

                <p className="login-text">
                    Don’t have an account? <Link to="/signup" className="login-link">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
