import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <>
            {loading === false &&
                (isAuthenticated === false ? (
                    <Navigate to="/signIn" />
                ) : isAdmin ? (
                    user.role !== 'admin' ? (
                        <Navigate to="/signIn" />
                    ) : (
                        children
                    )
                ) : (
                    children
                ))}
        </>
    );
};

export default ProtectedRoute;
