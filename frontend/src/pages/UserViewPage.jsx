import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import UserDetails from '../components/UserDetails';

const UserViewPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="mt-4">
            <UserDetails user={user} />
        </div>
    );
};

export default UserViewPage;
