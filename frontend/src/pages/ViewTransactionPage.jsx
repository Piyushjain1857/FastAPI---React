import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import TransactionDetails from '../components/TransactionDetails';

const ViewTransactionPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await api.get(`/transactions/${id}`);
        setTransaction(response.data);
      } catch (error) {
        console.error("Failed to fetch transaction details:", error);
      }
    };
    fetchTransaction();
  }, [id]);

  return (
    <div className="mt-4">
      <TransactionDetails transaction={transaction} />
    </div>
  );
};

export default ViewTransactionPage;
