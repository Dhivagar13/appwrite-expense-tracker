import React, { useState } from 'react';
import PropTypes from 'prop-types';
import databaseService from '../appwrite/database';
import { useAuth } from '../context/AuthContext';

const AddExpense = ({ onAdd }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const expense = await databaseService.createExpense({
                ...formData,
                amount: parseFloat(formData.amount),
                userId: user.$id
            });
            onAdd(expense);
            setFormData({
                title: '',
                amount: '',
                category: 'Food',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (err) {
            setError('Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-expense-card">
            <h3>Add New Expense</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-expense-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Groceries"
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
};

AddExpense.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default AddExpense;