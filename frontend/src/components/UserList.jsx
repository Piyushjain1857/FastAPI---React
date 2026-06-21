import { Link } from 'react-router-dom';

const UserList = ({ users, onDelete }) => {
    return (
        <table className='table table-striped table-bordered table-hover mt-4'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/user/view/${user.id}`} className="btn btn-secondary btn-sm me-2" > View </Link>
                            <Link to={`/user/edit/${user.id}`} className="btn btn-info btn-sm me-2" > Edit </Link>
                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.id)} > Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
