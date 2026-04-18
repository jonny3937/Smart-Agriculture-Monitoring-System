import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function CreateField() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        crop_type: '',
        planting_date: '',
        current_stage: 'Land Preparation',
        assigned_agent_id: ''
    });
    const [agents, setAgents] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchAgents = async () => {
            const { data } = await api.get('/users/agents');
            setAgents(data);
        };
        fetchAgents();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await api.post('/fields', formData);
            if (formData.assigned_agent_id) {
                await api.put(`/fields/${data.id}/assign`, { agent_id: formData.assigned_agent_id });
            }
            navigate('/fields');
        } catch (err) {
            alert('Error creating field');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create New Field</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter the details to register a new agricultural monitoring area.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>FIELD NAME</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., North Hill Corn Section"
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
                                    placeholder="e.g., Corn, Wheat"
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

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>INITIAL STAGE</label>
                            <input 
                                type="text" 
                                required
                                value={formData.current_stage}
                                onChange={e => setFormData({ ...formData, current_stage: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>ASSIGN TO AGENT (OPTIONAL)</label>
                            <select 
                                value={formData.assigned_agent_id}
                                onChange={e => setFormData({ ...formData, assigned_agent_id: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}
                            >
                                <option value="">Select an agent</option>
                                {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                type="button" 
                                onClick={() => navigate('/fields')}
                                style={{ flex: 1, padding: '0.75rem', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={submitting}
                                style={{ 
                                    flex: 2, 
                                    padding: '0.75rem', 
                                    background: submitting ? 'var(--text-muted)' : 'var(--primary)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    cursor: 'pointer', 
                                    fontWeight: '600' 
                                }}
                            >
                                {submitting ? 'Creating...' : 'Create Field Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
