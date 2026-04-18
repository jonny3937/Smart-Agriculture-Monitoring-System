import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import api from '../services/api';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simplification: just updating name for now as backend might need expansion for password
            await api.put('/users/profile', { name, password });
            setMessage('Profile updated successfully');
        } catch (err) {
            setMessage('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ 
                            width: '100px', 
                            height: '100px', 
                            background: 'var(--primary)', 
                            color: 'white', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            fontSize: '3rem', 
                            margin: '0 auto 1.5rem',
                            fontWeight: '800'
                        }}>
                            {user?.name?.[0].toUpperCase()}
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{user?.name}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>{user?.role} • {user?.email}</p>
                    </div>

                    {message && (
                        <div style={{ 
                            padding: '1rem', 
                            background: message.includes('success') ? '#c6f6d5' : '#fff5f5', 
                            color: message.includes('success') ? '#22543d' : '#c53030',
                            borderRadius: '8px',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            border: `1px solid ${message.includes('success') ? '#9ae6b4' : '#feb2b2'}`
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>DISPLAY NAME</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontWeight: '700', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>NEW PASSWORD (LEAVE BLANK TO KEEP CURRENT)</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                background: 'var(--primary)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '12px', 
                                fontWeight: '700', 
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(49, 130, 206, 0.2)'
                            }}
                        >
                            {loading ? 'Updating...' : 'Save Profile Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
