/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import UserForm from '../components/UserForm';

const AddEditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await api.get(`/users/${id}`);
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            };
            fetchUser();
        } else {
            setCurrentUser(null);
        }
    }, [id]);

    return (
        <div className="mt-4">
            <h2>{id ? 'Edit Record' : 'Add Record'}</h2>

            <UserForm
                currentUser={currentUser}
                onComplete={() => navigate('/user')}
                onCancel={() => navigate('/user')}
            />
        </div>
    );
};

export default AddEditUserPage;
