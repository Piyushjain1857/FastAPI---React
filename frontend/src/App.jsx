import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TransactionHomePage from './pages/TransactionHomePage';
import TransactionFormPage from './pages/TransactionFormPage';
import TransactionViewPage from './pages/TransactionViewPage';
import UserHomePage from './pages/UserHomePage';
import UserFormPage from './pages/UserFormPage';
import UserViewPage from './pages/UserViewPage';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TransactionHomePage />} />
          <Route path="/transaction" element={<TransactionHomePage />} />
          <Route path="/transaction/add" element={<TransactionFormPage />} />
          <Route path="/transaction/edit/:id" element={<TransactionFormPage />} />
          <Route path="/transaction/view/:id" element={<TransactionViewPage />} />
          <Route path="/user" element={<UserHomePage />} />
          <Route path="/user/add" element={<UserFormPage />} />
          <Route path="/user/edit/:id" element={<UserFormPage />} />
          <Route path="/user/view/:id" element={<UserViewPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
