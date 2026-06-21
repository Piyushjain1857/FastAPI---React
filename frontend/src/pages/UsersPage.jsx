/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserList from '../components/UserList';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const loadUsers = async () => {
        try {
            const response = await api.get('/users/');
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await api.delete(`/users/${id}`);
                loadUsers();
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h2>Users</h2>
                <button className="btn btn-success" onClick={() => navigate('/user/add')}>
                    Add Record
                </button>
            </div>
            <UserList
                users={users}
                onDelete={handleDelete}
            />
        </>
    );
};

export default UsersPage;
