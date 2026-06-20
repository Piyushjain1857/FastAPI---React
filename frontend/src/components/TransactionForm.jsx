/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import api from '../api';

const TransactionForm = ({ onComplete, onCancel, currentTransaction }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  useEffect(() => {
    if (currentTransaction) {
      setFormData(currentTransaction);
    } else {
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      });
    }
  }, [currentTransaction]);

  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentTransaction) {
        await api.put(`/transactions/${currentTransaction.id}`, formData);
      } else {
        await api.post('/transactions/', formData);
      }
      
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_income: false,
        date: ''
      });
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3 mt-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input type="text" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="is_income" className="form-label">Income..?</label>
        <input type="checkbox" className="form-check-input ms-2" id="is_income" name="is_income" checked={formData.is_income} onChange={handleInputChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleInputChange} />
      </div>

      <button type="submit" className="btn btn-primary"> 
        {currentTransaction ? 'Update Transaction' : 'Submit'} 
      </button>
      <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelClick}>
        Cancel
      </button>
    </form>
  );
};

export default TransactionForm;
