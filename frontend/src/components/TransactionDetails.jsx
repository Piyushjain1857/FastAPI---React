import { Link } from 'react-router-dom';

const TransactionDetails = ({ transaction }) => {
  if (!transaction) return null;

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Transaction Details</h3>
      </div>
      <div className="card-body">
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Income?:</strong> {transaction.is_income ? 'Yes' : 'No'}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <Link to="/" className="btn btn-secondary mt-3">Back to List</Link>
      </div>
    </div>
  );
};

export default TransactionDetails;
