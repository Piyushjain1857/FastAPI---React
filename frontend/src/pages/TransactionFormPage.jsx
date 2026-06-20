/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import TransactionForm from '../components/TransactionForm';

const TransactionFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTransaction = async () => {
        try {
          const response = await api.get(`/transactions/${id}`);
          setCurrentTransaction(response.data);
        } catch (error) {
          console.error("Failed to fetch transaction:", error);
        }
      };
      fetchTransaction();
    } else {
      setCurrentTransaction(null);
    }
  }, [id]);

  return (
    <div className="mt-4">
      <h2>{id ? 'Edit Record' : 'Add Record'}</h2>
      
      <TransactionForm 
        currentTransaction={currentTransaction} 
        onComplete={() => navigate('/')}
        onCancel={() => navigate('/')}
      />
    </div>
  );
};

export default TransactionFormPage;
