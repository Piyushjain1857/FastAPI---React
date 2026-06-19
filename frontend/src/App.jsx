import { useState, useEffect } from 'react';
import api from './api';
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await api.get('/transactions/');
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    loadTransactions();
  }, [refreshTrigger]);

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <TransactionForm fetchTransactions={handleTransactionAdded} />
        <TransactionList transactions={transactions} />
      </div>
    </>
  );
};

export default App;
