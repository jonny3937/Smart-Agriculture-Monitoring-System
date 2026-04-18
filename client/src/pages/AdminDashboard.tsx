import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function AdminDashboard() {
    const [summary, setSummary] = useState({ total: 0, active: 0, atRisk: 0, completed: 0 });
    const [recentFields, setRecentFields] = useState<any[]>([]);

    useEffect(() => {
        fetchSummary();
        fetchFields();
    }, []);

    const fetchSummary = async () => {
        const { data } = await api.get('/fields/summary');
        setSummary(data);
    };

    const fetchFields = async () => {
        const { data } = await api.get('/fields');
        setRecentFields(data.slice(0, 5));
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <header style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Administrative Overview</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back. Here is what is happening across your fields today.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { label: 'Total Fields', value: summary.total, color: 'var(--primary)', icon: '🌍' },
                        { label: 'Active', value: summary.active, color: 'var(--success)', icon: '🌱' },
                        { label: 'At Risk', value: summary.atRisk, color: 'var(--warning)', icon: '⚠️' },
                        { label: 'Completed', value: summary.completed, color: '#718096', icon: '✅' },
                    ].map(stat => (
                        <div key={stat.label} style={{ 
                            background: 'white', 
                            padding: '1.5rem', 
                            borderRadius: 'var(--radius)', 
                            boxShadow: 'var(--shadow)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ fontSize: '2rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>{stat.icon}</div>
                            <div>
                                <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</h3>
                                <p style={{ fontSize: '1.75rem', fontWeight: '800', color: stat.color }}>{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem' }}>Recent Operations</h2>
                            <Link to="/fields" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>View All →</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentFields.map(field => (
                                <Link key={field.id} to={`/fields/${field.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{field.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{field.crop_type} • {field.current_stage}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: field.status === 'Active' ? 'var(--success)' : field.status === 'At Risk' ? 'var(--warning)' : 'inherit' }}>{field.status}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{field.agent_name || 'Unassigned'}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Actions</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Link to="/fields/create" style={{ padding: '1rem', background: 'var(--primary)', color: 'white', textDecoration: 'none', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '0.875rem' }}>Add Field</Link>
                                <Link to="/admin/users" style={{ padding: '1rem', background: 'white', color: 'var(--text-main)', border: '1px solid var(--border)', textDecoration: 'none', borderRadius: '8px', textAlign: 'center', fontWeight: '600', fontSize: '0.875rem' }}>Manage Agents</Link>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', background: '#ebf8ff', borderRadius: 'var(--radius)', border: '1px solid #bee3f8' }}>
                            <h3 style={{ fontSize: '1rem', color: '#2b6cb0', marginBottom: '0.5rem' }}>System Status</h3>
                            <p style={{ fontSize: '0.875rem', color: '#2c5282' }}>All systems operational. Backend connected to PostgreSQL. {summary.atRisk} fields require attention.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
