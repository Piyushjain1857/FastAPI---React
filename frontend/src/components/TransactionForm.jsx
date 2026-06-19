import { useState } from 'react';
import api from '../api';

const TransactionForm = ({ fetchTransactions }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

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

    await api.post('/transactions/', formData);

    fetchTransactions();

    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3 mt-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="text"
          className="form-control"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="is_income" className="form-label">
          Income..!?
        </label>
        <input
          type="checkbox"
          className="form-check-input ms-2"
          id="is_income"
          name="is_income"
          checked={formData.is_income}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="text"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
