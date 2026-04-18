import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function FieldsList() {
    const { user } = useContext(AuthContext);
    const [fields, setFields] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        try {
            const { data } = await api.get('/fields');
            setFields(data);
        } catch (err) {
            console.error('Error fetching fields:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>{user?.role === 'Admin' ? 'All Managed Fields' : 'My Assigned Fields'}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Overview of current agricultural status across locations.</p>
                    </div>
                    {user?.role === 'Admin' && (
                        <Link to="/fields/create" style={{ 
                            padding: '0.75rem 1.5rem', 
                            background: 'var(--primary)', 
                            color: 'white', 
                            textDecoration: 'none', 
                            borderRadius: '8px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>+</span> New Field
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>Loading fields...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {fields.map(field => (
                            <Link key={field.id} to={`/fields/${field.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="glass" style={{ 
                                    padding: '1.5rem', 
                                    borderRadius: 'var(--radius)', 
                                    boxShadow: 'var(--shadow)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    borderLeft: `6px solid ${field.status === 'Active' ? 'var(--success)' : field.status === 'At Risk' ? 'var(--warning)' : '#718096'}`
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{field.name}</h3>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{field.crop_type}</span>
                                        </div>
                                        <span style={{ 
                                            padding: '0.25rem 0.75rem', 
                                            borderRadius: '99px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            background: field.status === 'Active' ? '#c6f6d5' : field.status === 'At Risk' ? '#feebc8' : '#edf2f7',
                                            color: field.status === 'Active' ? '#22543d' : field.status === 'At Risk' ? '#7b341e' : '#4a5568'
                                        }}>
                                            {field.status}
                                        </span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Current Stage</span>
                                            <span style={{ fontWeight: '600' }}>{field.current_stage}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Assigned Agent</span>
                                            <span style={{ fontWeight: '500' }}>{field.agent_name || 'Unassigned'}</span>
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{field.id}</span>
                                        <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600' }}>View Details →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
