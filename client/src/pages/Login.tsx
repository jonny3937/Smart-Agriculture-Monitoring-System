import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.endsWith('@gmail.com')) {
            setError('Only @gmail.com email addresses are allowed.');
            return;
        }

        try {
            const user = await login(email, password);
            if (user.role === 'Admin') navigate('/admin/dashboard');
            else navigate('/agent/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: 400, margin: '2rem auto', padding: '0 2rem' }}>
                <BackButton />
                <div style={{ background: 'white', padding: '2rem', borderRadius: 12, boxShadow: 'var(--shadow-lg)' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-main)', fontWeight: '800' }}>SmartSeason Login</h2>
                    {error && <div style={{ background: '#fff5f5', color: '#c53030', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.875rem', border: '1px solid #feb2b2' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>EMAIL ADDRESS</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required pattern=".*@gmail\.com$" title="Logins should end with @gmail.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>PASSWORD</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box' }} />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>Access Dashboard</button>
                    </form>
                    <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
                        <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
