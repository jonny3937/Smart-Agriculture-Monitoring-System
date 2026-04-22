import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Field Agent');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.endsWith('@gmail.com')) {
            setError('Only @gmail.com email addresses are allowed.');
            return;
        }

        if (role === 'Admin' && email !== 'mainamwangi@gmail.com') {
            setError('Only mainamwangi@gmail.com is allowed to register as an Admin.');
            return;
        }

        try {
            await api.post('/users/register', { name, email, password, role });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: 400, margin: '2rem auto', padding: '0 2rem' }}>
                <BackButton />
                <div style={{ background: 'white', padding: '2rem', borderRadius: 12, boxShadow: 'var(--shadow-lg)' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-main)', fontWeight: '800' }}>Create Account</h2>
                    {error && <div style={{ background: '#fff5f5', color: '#c53030', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.875rem', border: '1px solid #feb2b2' }}>{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>FULL NAME</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>GMAIL ADDRESS</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required pattern=".*@gmail\.com$" title="Logins should end with @gmail.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>PASSWORD</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>SELECT ROLE</label>
                        <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, boxSizing: 'border-box', background: 'white' }}>
                            <option value="Field Agent">Field Agent</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '0.75rem', background: 'var(--secondary)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>Finish Registration</button>
                </form>
                
                <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Already registered? </span>
                    <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Log in here</Link>
                </div>
            </div>
            </div>
        </div>
    );
}
