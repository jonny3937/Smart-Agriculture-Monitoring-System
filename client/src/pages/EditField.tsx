import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function EditField() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        crop_type: '',
        planting_date: '',
        current_stage: '',
        assigned_agent_id: ''
    });
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fieldRes, agentsRes] = await Promise.all([
                    api.get(`/fields`),
                    api.get('/users/agents')
                ]);
                const field = fieldRes.data.find((f: any) => f.id === parseInt(id!));
                if (field) {
                    setFormData({
                        name: field.name,
                        crop_type: field.crop_type,
                        planting_date: new Date(field.planting_date).toISOString().split('T')[0],
                        current_stage: field.current_stage,
                        assigned_agent_id: field.assigned_agent_id || ''
                    });
                }
                setAgents(agentsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/fields/${id}`, formData);
            if (formData.assigned_agent_id !== undefined) {
                await api.put(`/fields/${id}/assign`, { agent_id: formData.assigned_agent_id || null });
            }
            navigate(`/fields/${id}`);
        } catch (err) {
            alert('Error updating field');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Edit Field Profile</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Modify the core details or reassign the agent for this field.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>FIELD NAME</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>CROP TYPE</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.crop_type}
                                    onChange={e => setFormData({ ...formData, crop_type: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>PLANTING DATE</label>
                                <input 
                                    type="date" 
                                    required
                                    value={formData.planting_date}
                                    onChange={e => setFormData({ ...formData, planting_date: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>ASSIGNED AGENT</label>
                            <select 
                                value={formData.assigned_agent_id}
                                onChange={e => setFormData({ ...formData, assigned_agent_id: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}
                            >
                                <option value="">Unassigned</option>
                                {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                type="button" 
                                onClick={() => navigate(-1)}
                                style={{ flex: 1, padding: '0.75rem', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                style={{ 
                                    flex: 2, 
                                    padding: '0.75rem', 
                                    background: 'var(--primary)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    cursor: 'pointer', 
                                    fontWeight: '600' 
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
