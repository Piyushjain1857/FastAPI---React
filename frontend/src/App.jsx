import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TransactionsPage from './pages/TransactionsPage';
import AddEditTransactionPage from './pages/AddEditTransactionPage';
import ViewTransactionPage from './pages/ViewTransactionPage';
import UsersPage from './pages/UsersPage';
import AddEditUserPage from './pages/AddEditUserPage';
import ViewUserPage from './pages/ViewUserPage';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" />
          <Route path="/transaction" element={<TransactionsPage />} />
          <Route path="/transaction/add" element={<AddEditTransactionPage />} />
          <Route path="/transaction/edit/:id" element={<AddEditTransactionPage />} />
          <Route path="/transaction/view/:id" element={<ViewTransactionPage />} />
          <Route path="/user" element={<UsersPage />} />
          <Route path="/user/add" element={<AddEditUserPage />} />
          <Route path="/user/edit/:id" element={<AddEditUserPage />} />
          <Route path="/user/view/:id" element={<ViewUserPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
