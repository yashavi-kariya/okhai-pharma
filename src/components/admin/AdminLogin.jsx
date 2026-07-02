import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '@/utils/api';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('okhai_admin_token');
        if (token) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Debug: log outgoing payload shape (do not print raw password)
            // If browser autofill populated the inputs but React state wasn't updated,
            // fall back to reading the values from the form elements.
            const form = event.target;
            const payloadEmail = email || (form.email && form.email.value) || '';
            const payloadPassword = password || (form.password && form.password.value) || '';

            // payload logging removed

            const data = await apiCall('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ email: payloadEmail, password: payloadPassword }),
            });
            localStorage.setItem('okhai_admin_token', data.token);
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '16px', boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12)', padding: '32px' }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Okhai Pharma</p>
                <h1 style={{ fontSize: '28px', margin: '0 0 8px', color: '#0f172a' }}>Admin Log In</h1>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>Access the management dashboard for your site content.</p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
                    <label style={{ display: 'grid', gap: '6px', color: '#334155', fontWeight: 600 }}>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="admin@okhai.com"
                            required
                            style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 14px', fontSize: '15px' }}
                        />
                    </label>

                    <label style={{ display: 'grid', gap: '6px', color: '#334155', fontWeight: 600 }}>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter password"
                            required
                            style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '12px 14px', fontSize: '15px' }}
                        />
                    </label>

                    {error ? <div style={{ color: '#b91c1c', background: '#fee2e2', padding: '10px 12px', borderRadius: '10px' }}>{error}</div> : null}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ background: '#0f766e', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 16px', fontSize: '15px', cursor: 'pointer' }}
                    >
                        {loading ? 'Signing in...' : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
