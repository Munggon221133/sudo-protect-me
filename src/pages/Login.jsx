import { useNavigate, useLocation, Link } from 'react-router-dom'
import { setToken } from '../lib/storage'
import { useState } from 'react'
import '../styles/Login.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const onSubmit = (e) => {
        e.preventDefault()
        if (username && password) {
            setToken('demo-token')
            navigate(from, { replace: true })
        }
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={onSubmit} className="login-form">
                <h1>Login</h1>

                <input
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    className="login-input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit" className="login-btn">
                    Sign in
                </button>

                <p className="login-text">
                    Don’t have an account? <Link to="/signup" className="login-link">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
