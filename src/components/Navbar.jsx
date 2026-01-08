import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">Expense Tracker</div>
            <div className="nav-links">
                {user && (
                    <>
                        <span className="user-name">Hello, {user.name}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;