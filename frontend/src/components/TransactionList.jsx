import { Link } from 'react-router-dom';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <table className='table table-striped table-bordered table-hover mt-4'>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Income?</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.description}</td>
            <td>{transaction.is_income ? 'Yes' : 'No'}</td>
            <td>{transaction.date}</td>
            <td>
              <Link to={`/transactions/view/${transaction.id}`} className="btn btn-secondary btn-sm me-2" > View </Link>
              <Link to={`/transactions/edit/${transaction.id}`} className="btn btn-info btn-sm me-2" > Edit </Link>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction.id)} > Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
