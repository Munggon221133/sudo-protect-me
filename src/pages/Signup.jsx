import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import trueLogo from '../assets/true_logo.png'
import '../styles/Signup.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function Signup() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (loading) return

        setErr(null)
        setMsg(null)

        if (!form.firstName || !form.lastName || !form.email ||
            !form.password || !form.confirmPassword) {
            setErr('Please fill all fields')
            return
        }
        if (form.password.length < 8) {
            setErr('Password must be at least 8 characters')
            return
        }
        if (form.password !== form.confirmPassword) {
            setErr('Passwords do not match')
            return
        }

        try {
            setLoading(true)
            const res = await fetch(`${API_BASE}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    email: form.email.trim(),
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.message || 'Signup failed')

            setMsg('Account created successfully')
            navigate('/', { state: { signupSuccess: true } })
        } catch (e) {
            setErr(e.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <img src={trueLogo} alt="true" className="signup-logo" />

                <div className="signup-card">
                    <h1 className="signup-heading">Create your account</h1>

                    {err && (
                        <div className="signup-alert signup-alert-error">
                            {err}
                        </div>
                    )}
                    {msg && (
                        <div className="signup-alert signup-alert-success">
                            {msg}
                        </div>
                    )}

                    <form className="signup-form" onSubmit={onSubmit} noValidate>
                        <div className="signup-row">
                            <label className="signup-label">
                                First Name
                                <input
                                    className="signup-input"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={form.firstName}
                                    onChange={onChange}
                                />
                            </label>

                            <label className="signup-label">
                                Last Name
                                <input
                                    className="signup-input"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={form.lastName}
                                    onChange={onChange}
                                />
                            </label>
                        </div>

                        <label className="signup-label">
                            Email
                            <input
                                className="signup-input"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                autoComplete="email"
                            />
                        </label>

                        <label className="signup-label">
                            Password
                            <input
                                className="signup-input"
                                name="password"
                                placeholder="Password (min 8 characters)"
                                type="password"
                                value={form.password}
                                onChange={onChange}
                                autoComplete="new-password"
                            />
                        </label>

                        <label className="signup-label">
                            Confirm Password
                            <input
                                className="signup-input"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                value={form.confirmPassword}
                                onChange={onChange}
                                autoComplete="new-password"
                            />
                        </label>

                        <button className="signup-btn" type="submit" disabled={loading}>
                            {loading ? 'Creating…' : 'Create account'}
                        </button>
                    </form>

                    <p className="signup-footer-text">
                        Already have an account?{' '}
                        <Link to="/" className="signup-link">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
