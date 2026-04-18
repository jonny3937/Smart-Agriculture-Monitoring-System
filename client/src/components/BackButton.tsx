import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate(-1)}
            style={{ 
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                marginBottom: '1rem',
                transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
            <span>←</span> Back
        </button>
    );
};

export default BackButton;
