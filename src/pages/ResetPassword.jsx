import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import trueLogo from '../assets/true_logo.png'
import '../styles/ResetPassword.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (loading) return

        setErr(null)
        setMsg(null)

        if (!email || !password || !confirmPassword) {
            setErr('Please fill all fields')
            return
        }
        if (password.length < 8) {
            setErr('Password must be at least 8 characters')
            return
        }
        if (password !== confirmPassword) {
            setErr('Passwords do not match')
            return
        }

        try {
            setLoading(true)

            const res = await fetch(`${API_BASE}/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                    confirmPassword,
                }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.message || 'Reset password failed')
            }
            navigate('/', { state: { resetSuccess: true } })
        } catch (e) {
            setErr(e.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <img src={trueLogo} alt="true" className="reset-password-logo" />

                <div className="reset-password-card">
                    <h1 className="reset-password-heading">Reset your password</h1>

                    {err && (
                        <div className="reset-password-alert reset-password-alert-error">
                            {err}
                        </div>
                    )}
                    {msg && (
                        <div className="reset-password-alert reset-password-alert-success">
                            {msg}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="reset-password-form" noValidate>
                        <label className="reset-password-label">
                            Email
                            <input
                                className="reset-password-input"
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </label>

                        <label className="reset-password-label">
                            New Password
                            <input
                                className="reset-password-input"
                                placeholder="New password (min 8 characters)"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </label>

                        <label className="reset-password-label">
                            Confirm New Password
                            <input
                                className="reset-password-input"
                                placeholder="Confirm new password"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </label>

                        <button
                            type="submit"
                            className="reset-password-btn"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? 'Updating…' : 'Reset Password'}
                        </button>
                    </form>

                    <div className="reset-password-footer">
                        <Link to="/" className="reset-password-footer-link">
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}