const axios = require('axios');
const BASE_URL = process.env.BASE_URL

//____________________________________REGISTER USER____________________________________
// This function registers a new user by sending a POST request to the server
// It expects a user object containing the necessary registration details
// Returns the response data from the server or throws an error if the request fails
const registerUser = async (user) => {
    const registerUrl = `${BASE_URL}/api/users/register`;
    try {
        const response = await axios.post(registerUrl, user);
        
        // Check for specific success or error statuses if needed
        if (response.status === 201) { // Assuming 201 means created
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // No response from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else triggered the error
            console.error('Error during request:', error.message);
            throw error;
        }
    }
};


//____________________________________LOGIN USER____________________________________
// This function logs in an existing user by sending a POST request to the server
// It expects a user object containing the username and password
// Returns the response data from the server or throws an error if the request fails
const loginUser = async (user) => {
    const loginUrl = `${BASE_URL}/api/users/login`;
    try {
        const response = await axios.post(loginUrl, user);
        
        // Check for specific success or error statuses if needed
        if (response.status === 200) { // Assuming 200 means OK
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // No response from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else triggered the error
            console.error('Error during request:', error.message);
            throw error;
        }
    }
}


//____________________________________GET CURRENT USER____________________________________
// This function retrieves the current user's information by sending a GET request to the server
// It expects a token for authentication
// Returns the response data from the server or throws an error if the request fails
const getCurrentUser = async (token) => {
    const userUrl = `${BASE_URL}/api/users/me`;
    try {
        const response = await axios.get(userUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // No response from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else triggered the error
            console.error('Error during request:', error.message);
            throw error;
        }
    }
};

//____________________________________GET USER BY ID____________________________________
// This function retrieves a user by their ID by sending a GET request to the server
// It expects a userId and a token for authentication
// Returns the response data from the server or throws an error if the request fails
const getUserById = async (userId, token) => {
    const userUrl = `${BASE_URL}/api/users/${userId}`;
    try {
        const response = await axios.get(userUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // No response from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else triggered the error
            console.error('Error during request:', error.message);
            throw error;
        }
    }
};

//____________________________________DELETE USER BY ID____________________________________
// This function deletes a user by their ID by sending a DELETE request to the server
// It expects a userId and a token for authentication
// Returns the response data from the server or throws an error if the request fails
const deleteUserById = async (userId, token) => {
    const userUrl = `${BASE_URL}/api/users/${userId}`;
    try {
        const response = await axios.delete(userUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            return { message: 'User deleted successfully' };
        } else {
            console.error('Unexpected response status:', response.status);
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            // No response from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server');
        } else {
            // Something else triggered the error
            console.error('Error during request:', error.message);
            throw error;
        }
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    getUserById,
    deleteUserById
};
// This module provides functions to interact with user-related endpoints in the API
// It includes functions for registering, logging in, retrieving, and deleting users
// Each function handles errors and responses appropriately, ensuring robust communication with the server
// The BASE_URL is dynamically set based on the environment variable, allowing flexibility in deployment
// Ensure that the environment variable BASE_URL is set correctly in your .env file

