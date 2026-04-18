import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function FieldDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [field, setField] = useState<any>(null);
    const [updates, setUpdates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Update Form State
    const [stage, setStage] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [fieldRes, updatesRes] = await Promise.all([
                api.get(`/fields`), 
                api.get(`/fields/${id}/updates`)
            ]);
            const foundField = fieldRes.data.find((f: any) => f.id === parseInt(id!));
            setField(foundField);
            setUpdates(updatesRes.data);
            if (foundField) setStage(foundField.current_stage);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/fields/${id}/updates`, { stage, notes });
            setNotes('');
            fetchData();
        } catch (err) {
            alert('Update failed');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this field permanently?')) return;
        try {
            await api.delete(`/fields/${id}`);
            navigate('/fields');
        } catch (err) {
            alert('Delete failed');
        }
    };

    if (loading) return <div>Loading details...</div>;
    if (!field) return <Navbar />;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                
                <BackButton />

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{field.name}</h1>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{field.crop_type}</span>
                                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border)' }}></span>
                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{field.current_stage}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ 
                                        padding: '0.5rem 1rem', 
                                        borderRadius: '99px',
                                        fontSize: '0.875rem',
                                        fontWeight: '800',
                                        background: field.status === 'Active' ? '#c6f6d5' : field.status === 'At Risk' ? '#feebc8' : '#edf2f7',
                                        color: field.status === 'Active' ? '#22543d' : field.status === 'At Risk' ? '#7b341e' : '#4a5568'
                                    }}>
                                        {field.status}
                                    </span>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                        {user?.role === 'Admin' && (
                                            <>
                                                <Link to={`/fields/${id}/edit`} style={{ padding: '0.5rem 1rem', background: '#edf2f7', borderRadius: '8px', textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.875rem' }}>Edit</Link>
                                                <button onClick={handleDelete} style={{ padding: '0.5rem 1rem', background: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>Delete</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Planting Date</h4>
                                    <p style={{ fontWeight: '600' }}>{new Date(field.planting_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Responsible Agent</h4>
                                    <p style={{ fontWeight: '600' }}>{field.agent_name || 'Not Assigned'}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Activity History</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {updates.map((u, i) => (
                                    <div key={u.id} style={{ display: 'flex', gap: '1.5rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }}></div>
                                            {i !== updates.length - 1 && <div style={{ position: 'absolute', top: '24px', left: '5.5px', width: '1px', height: 'calc(100% + 0.5rem)', background: 'var(--border)' }}></div>}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                <span style={{ fontWeight: '700' }}>Stage: {u.stage}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(u.created_at).toLocaleString()}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{u.notes}</p>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated by {u.name} ({u.role})</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Log Field Update</h3>
                            <form onSubmit={handleUpdate}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CURRENT STAGE</label>
                                    <input 
                                        type="text" 
                                        value={stage} 
                                        onChange={e => setStage(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SITE NOTES</label>
                                    <textarea 
                                        value={notes} 
                                        onChange={e => setNotes(e.target.value)}
                                        placeholder="Add observations..."
                                        rows={4}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', resize: 'none' }}
                                    />
                                </div>
                                <button type="submit" style={{ 
                                    width: '100%', 
                                    padding: '0.75rem', 
                                    background: 'var(--secondary)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}>
                                    Submit Activity
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
