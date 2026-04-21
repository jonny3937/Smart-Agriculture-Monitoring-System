import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

export default function Users() {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const { data } = await api.get('/users/agents');
            setAgents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <div className="animate-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 4rem' }}>
                <BackButton />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>User Management</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Monitor and manage roles for your field agents.</p>
                    </div>
                </div>

                <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f7fafc', borderBottom: '1px solid var(--border)' }}>
                            <tr>
                                <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Name</th>
                                <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</th>
                                <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role</th>
                                <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map(agent => (
                                <tr key={agent.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ fontWeight: '600' }}>{agent.name}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>{agent.email}</td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span style={{ 
                                            background: agent.role === 'Admin' ? '#fef3c7' : '#ebf8ff', 
                                            color: agent.role === 'Admin' ? '#92400e' : '#2b6cb0', 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: '6px', 
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            {agent.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>#{agent.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
