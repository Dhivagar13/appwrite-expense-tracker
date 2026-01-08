import React, { useState, useEffect } from 'react';
import databaseService from '../appwrite/database';
import { useAuth } from '../context/AuthContext';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState('All');

    useEffect(() => {
        if (user) {
            fetchExpenses();
        }
    }, [user]);

    const fetchExpenses = async () => {
        setLoading(true);
        const data = await databaseService.getExpenses(user.$id);
        if (data) {
            setExpenses(data.documents);
        }
        setLoading(false);
    };

    const handleAddExpense = (newExpense) => {
        setExpenses([newExpense, ...expenses]);
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.$id !== id));
    };

    const filteredExpenses = filterCategory === 'All'
        ? expenses
        : expenses.filter(exp => exp.category === filterCategory);

    const totalExpense = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <div className="total-card">
                        <span>Total Expenses</span>
                        <h2>₹{totalExpense.toFixed(2)}</h2>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-left">
                        <AddExpense onAdd={handleAddExpense} />
                    </div>
                    <div className="dashboard-right">
                        <div className="filter-section">
                            <label>Filter by Category:</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {loading ? (
                            <p>Loading expenses...</p>
                        ) : (
                            <ExpenseList
                                expenses={filteredExpenses}
                                onDelete={handleDeleteExpense}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;