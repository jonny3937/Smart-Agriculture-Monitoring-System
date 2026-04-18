import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function AgentDashboard() {
    const { user } = useContext(AuthContext);
    const [fields, setFields] = useState<any[]>([]);
    const [summary, setSummary] = useState({ total: 0, active: 0, atRisk: 0 });

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        const { data } = await api.get('/fields');
        setFields(data);
        setSummary({
            total: data.length,
            active: data.filter((f: any) => f.status === 'Active').length,
            atRisk: data.filter((f: any) => f.status === 'At Risk').length,
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Agent Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Working as **{user?.name}**. You have {fields.length} active assignments.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { label: 'My Fields', value: summary.total, color: 'var(--primary)' },
                        { label: 'Healthy/Active', value: summary.active, color: 'var(--success)' },
                        { label: 'Needs Attention', value: summary.atRisk, color: 'var(--warning)' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{stat.label}</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800', color: stat.color }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Assignments</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {fields.map(field => (
                            <Link key={field.id} to={`/fields/${field.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ 
                                    padding: '1.25rem', 
                                    border: '1px solid var(--border)', 
                                    borderRadius: '12px',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '700' }}>{field.name}</span>
                                        <span style={{ fontSize: '0.75rem', color: field.status === 'Active' ? 'var(--success)' : 'var(--warning)' }}>● {field.status}</span>
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{field.crop_type}</div>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{field.current_stage}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Update →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {fields.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No fields currently assigned to you.</p>}
                </div>
            </div>
        </div>
    );
}
