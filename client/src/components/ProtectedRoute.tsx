import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roleRequired?: 'Admin' | 'Field Agent';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roleRequired }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--background)' }}>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Loading SmartSeason...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roleRequired && user.role !== roleRequired) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
