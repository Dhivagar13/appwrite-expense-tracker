import React from 'react';
import PropTypes from 'prop-types';
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
            </div>
            {expenses.map((expense) => (
                <div key={expense.$id} className="expense-item">
                    <span className="expense-date" data-label="Date">{new Date(expense.date).toLocaleDateString()}</span>
                    <span className="expense-title" data-label="Title">{expense.title}</span>
                    <span className={`expense-category category-${expense.category.toLowerCase()}`} data-label="Category">
                        {expense.category}
                    </span>
                    <span className="expense-amount" data-label="Amount">₹{expense.amount.toFixed(2)}</span>
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

ExpenseList.propTypes = {
    expenses: PropTypes.arrayOf(
        PropTypes.shape({
            $id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ExpenseList;