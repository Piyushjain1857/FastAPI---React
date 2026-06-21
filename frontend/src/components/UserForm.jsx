/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import api from '../api';

const UserForm = ({ onComplete, onCancel, currentUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: ''
    });

    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser);
        } else {
            setFormData({
                name: '',
                email: '',
                age: '',
                address: ''
            });
        }
    }, [currentUser]);

    const handleInputChange = (event) => {
        const value =
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value;

        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (currentUser) {
                await api.put(`/users/${currentUser.id}`, formData);
            } else {
                await api.post('/users/', formData);
            }

            setFormData({
                name: '',
                email: '',
                age: '',
                address: ''
            });

            if (onComplete) {
                onComplete();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelClick = () => {
        setFormData({
            amount: '',
            category: '',
            description: '',
            is_income: false,
            date: ''
        });
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3 mt-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleInputChange} />
            </div>

            <button type="submit" className="btn btn-primary">
                {currentUser ? 'Update User' : 'Submit'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelClick}>
                Cancel
            </button>
        </form>
    );
};

export default UserForm;

