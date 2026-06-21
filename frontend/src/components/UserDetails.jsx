import { Link } from 'react-router-dom';

const UserDetails = ({ user }) => {
    if (!user) return null;

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h3>User Details</h3>
            </div>
            <div className="card-body">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <Link to="/user" className="btn btn-secondary mt-3">Back to List</Link>
            </div>
        </div>
    );
};

export default UserDetails;
