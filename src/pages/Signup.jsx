import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Signup.css'

export default function Signup() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        setMsg(null);

        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
            setErr('Please fill all fields');
            return;
        }
        if (form.password.length < 8) {
            setErr('Password must be at least 8 characters');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setErr('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || 'Signup failed');

            navigate('/', { state: { signupSuccess: true } });
        } catch (e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <form className="signup-form" onSubmit={onSubmit}>
                <h1>Sign Up</h1>

                <input
                    className="signup-input"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={onChange}
                />
                <input
                    className="signup-input"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={onChange}
                />
                <input
                    className="signup-input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                />
                <input
                    className="signup-input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                />
                <input
                    className="signup-input"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange}
                />

                <button className="signup-btn" type="submit" disabled={loading}>
                    {loading ? 'Creating…' : 'Create account'}
                </button>

                {err && <p style={{ color: '#f87171' }}>{err}</p>}
                {msg && <p style={{ color: '#22c55e' }}>{msg}</p>}

                <p className="signup-text">
                    Already have an account?{" "}
                    <Link to="/" className="signup-link">Login</Link>
                </p>
            </form>
        </div>
    );
}