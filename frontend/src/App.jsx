import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TransactionFormPage from './pages/TransactionFormPage';
import TransactionViewPage from './pages/TransactionViewPage';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<TransactionFormPage />} />
          <Route path="/edit/:id" element={<TransactionFormPage />} />
          <Route path="/view/:id" element={<TransactionViewPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
