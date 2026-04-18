import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function NotFound() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', background: 'var(--background)', padding: '2rem' }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                <BackButton />
            </div>
            <div style={{ fontSize: '6rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>404</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
                The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" style={{ 
                padding: '0.75rem 2rem', 
                background: 'var(--primary)', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: '600'
            }}>
                Back to Safety
            </Link>
        </div>
    );
}
