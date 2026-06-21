/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import TransactionList from '../components/TransactionList';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const loadTransactions = async () => {
    try {
      const response = await api.get('/transactions/');
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await api.delete(`/transactions/${id}`);
        loadTransactions();
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Transactions</h2>
        <button className="btn btn-success" onClick={() => navigate('/transaction/add')}>
          Add Record
        </button>
      </div>
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
      />
    </>
  );
};

export default TransactionsPage;
