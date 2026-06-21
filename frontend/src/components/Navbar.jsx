import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-muted" to="/">Finance App</Link>
        <div>
          <Link className="navbar-brand p-2 text-muted" to="/user">Users</Link>
          <Link className="navbar-brand p-2 text-muted" to="/transaction">Transactions</Link>
        </div>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;