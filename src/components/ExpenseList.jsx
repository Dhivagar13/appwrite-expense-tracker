import React from 'react';
import databaseService from '../appwrite/database';

const ExpenseList = ({ expenses, onDelete }) => {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            const success = await databaseService.deleteExpense(id);
            if (success) {
                onDelete(id);
            }
        }
    };

    if (expenses.length === 0) {
        return <div className="empty-state">No expenses found. Start adding some!</div>;
    }

    return (
        <div className="expense-list">
            <h3>Your Expenses</h3>
            <div className="expense-grid-header">
                <span>Date</span>
                <span>Title</span>
                <span>Category</span>
                <span>Amount</span>
                <span>Action</span>
            </div>
            {expenses.map((expense) => (
                <div key={expense.$id} className="expense-item">
                    <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                    <span className="expense-title">{expense.title}</span>
                    <span className={`expense-category category-${expense.category.toLowerCase()}`}>
                        {expense.category}
                    </span>
                    <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                    <button
                        onClick={() => handleDelete(expense.$id)}
                        className="btn-delete"
                        aria-label="Delete expense"
                    >
                        🗑️
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;