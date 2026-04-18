import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/AdminDashboard';
import AgentDashboard from '../pages/AgentDashboard';
import FieldsList from '../pages/FieldsList';
import FieldDetails from '../pages/FieldDetails';
import CreateField from '../pages/CreateField';
import EditField from '../pages/EditField';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute roleRequired="Admin">
                    <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <ProtectedRoute roleRequired="Admin">
                    <Users />
                </ProtectedRoute>
            } />

            {/* Field Routes */}
            <Route path="/fields" element={
                <ProtectedRoute>
                    <FieldsList />
                </ProtectedRoute>
            } />
            <Route path="/fields/create" element={
                <ProtectedRoute roleRequired="Admin">
                    <CreateField />
                </ProtectedRoute>
            } />
            <Route path="/fields/:id" element={
                <ProtectedRoute>
                    <FieldDetails />
                </ProtectedRoute>
            } />
            <Route path="/fields/:id/edit" element={
                <ProtectedRoute roleRequired="Admin">
                    <EditField />
                </ProtectedRoute>
            } />

            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={
                <ProtectedRoute roleRequired="Field Agent">
                    <AgentDashboard />
                </ProtectedRoute>
            } />

            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}
