import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Navbar />
            
            {/* Background Image Wrapper */}
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: -1,
                background: `linear-gradient(rgba(247, 250, 252, 0.4), rgba(247, 250, 252, 0.6)), url('/field_background_mockup_1776550005890.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'none'
            }} />

            <main className="animate-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
                <div style={{ 
                    display: 'inline-block', 
                    padding: '0.5rem 1.5rem', 
                    background: 'rgba(235, 248, 255, 0.8)', 
                    backdropFilter: 'blur(4px)',
                    color: 'var(--primary)', 
                    borderRadius: '99px',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    border: '1px solid rgba(49, 130, 206, 0.2)'
                }}>
                    Smart Agriculture Monitoring System
                </div>
                
                <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1', marginBottom: '1.5rem', letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Monitor Your Fields <br />
                    <span style={{ color: 'var(--primary)' }}>Real-Time Intelligence.</span>
                </h1>
                
                <p style={{ fontSize: '1.35rem', color: 'var(--text-main)', maxWidth: '750px', margin: '0 auto 3rem', opacity: 0.8, fontWeight: '500' }}>
                    The all-in-one platform for field agents and administrators to track crop progress, 
                    manage field status, and optimize seasonal yields through data-driven updates.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '6rem' }}>
                    <Link to="/login" style={{ 
                        padding: '1.1rem 3rem', 
                        background: 'var(--primary)', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: 'var(--radius)',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        boxShadow: '0 15px 30px -10px rgba(49, 130, 206, 0.5)'
                    }}>
                        Login to Dashboard
                    </Link>
                    <Link to="/register" style={{ 
                        padding: '1.1rem 3rem', 
                        background: 'rgba(255, 255, 255, 0.8)', 
                        backdropFilter: 'blur(10px)',
                        color: 'var(--text-main)', 
                        textDecoration: 'none', 
                        borderRadius: 'var(--radius)',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}>
                        Register Now
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', textAlign: 'left' }}>
                    {[
                        { icon: '📊', title: 'Data Summaries', desc: 'Instant overview of active, at-risk, and completed fields.' },
                        { icon: '📍', title: 'Agent Assignment', desc: 'Seamlessly assign field agents to specific crop locations.' },
                        { icon: '📝', title: 'Live Updates', desc: 'Agents provide real-time stage updates and site notes.' },
                    ].map((feature, i) => (
                        <div key={i} className="glass" style={{ 
                            padding: '2.5rem', 
                            borderRadius: '24px', 
                            boxShadow: 'var(--shadow)',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{feature.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
