import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({}); // State for storing error messages

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({}); // Clear errors on input change
    };

    // Form validation function
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}/; // Password must be at least 8 characters long and contain letters and numbers

        if (!isLogin) {
            if (!formData.username.trim()) {
                newErrors.username = 'Username is required';
            }
        }

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!passwordRegex.test(formData.password) || formData.password.trim() === '') {
            newErrors.password = 'Password must be at least 8 characters long and contain letters and numbers.';
        }

        setErrors(newErrors); // Update errors state
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // API calls for signup and login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(); // Validate form data
    
        if (!isValid) {
            return; // Prevent submission if validation fails
        }
    
        const API_URL = 'http://localhost:5000/api/auth/';
    
        try {
            if (isLogin) {
                // Login API call
                const response = await axios.post(API_URL + 'login', {
                    email: formData.email,
                    password: formData.password
                });
    
                // Assuming the response contains a user object and token
                const { user, token } = response.data;
    
                if (user && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user._id));
                    alert('Login successful!');
                    navigate('/');
                } else {
                    throw new Error('User data is missing in the response.');
                }
            } else {
                // Signup API call
                const response = await axios.post(API_URL + 'signup', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                alert('Signup successful! Welcome, ' + formData.username);
                navigate('/')
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred!');
        }
    };
    

    return (
        <div className="flex items-center justify-center md:h-[87.5vh] h-[82vh] bg-gray-100 px-3">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Signup'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required={!isLogin}
                                placeholder="Enter your username"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                </form>

                {/* Toggle between Login and Signup */}
                <p
                    className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Don't have an account? Signup here" : 'Already have an account? Login here'}
                </p>
            </div>
        </div>
    );
};

export default User;
