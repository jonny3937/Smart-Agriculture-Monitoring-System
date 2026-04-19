import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    const linkStyle = (path: string) => ({
        color: isActive(path) ? 'var(--primary)' : 'var(--text-main)',
        textDecoration: 'none',
        fontWeight: isActive(path) ? '600' : '500',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        background: isActive(path) ? '#ebf8ff' : 'transparent',
    });

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            marginBottom: '2rem'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.8rem' }}>🌱</span> SmartSeason
            </Link>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {user ? (
                    <>
                        {user.role === 'Admin' ? (
                            <>
                                <Link to="/admin/dashboard" style={linkStyle('/admin/dashboard')}>Dashboard</Link>
                                <Link to="/fields" style={linkStyle('/fields')}>Fields</Link>
                                <Link to="/admin/users" style={linkStyle('/admin/users')}>Users</Link>
                                <Link to="/profile" style={linkStyle('/profile')}>Profile</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/agent/dashboard" style={linkStyle('/agent/dashboard')}>My Dashboard</Link>
                                <Link to="/fields" style={linkStyle('/fields')}>My Fields</Link>
                                <Link to="/profile" style={linkStyle('/profile')}>Profile</Link>
                            </>
                        )}
                        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 0.5rem' }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.name}</span>
                        <button 
                            onClick={handleLogout}
                            style={{ 
                                padding: '0.5rem 1rem', 
                                background: '#fff5f5', 
                                color: '#c53030', 
                                border: '1px solid #feb2b2', 
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle('/login')}>Login</Link>
                        <Link to="/register" style={{ 
                            ...linkStyle('/register'), 
                            background: 'var(--primary)', 
                            color: 'white',
                            padding: '0.5rem 1.2rem'
                         }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
