import axios from 'axios';




//____________________________________REGISTER USER____________________________________
// This function registers a new user by sending a POST request to the server
// It expects a user object containing the necessary registration details
// Returns the response data from the server or throws an error if the request fails
export async function registerUser(user) {
    const registerUrl = 'http://localhost:4444/api/users/register';

    try{
        const response = await axios.post(registerUrl, user);
        
        
    } catch (error) {
        console.error('Registration failed:', error.message);
        throw new Error(`Registration failed: ${error.message}`)
    }
}


//____________________________________LOGIN USER____________________________________
// This function logs in an existing user by sending a POST request to the server
// It expects a user object containing the username and password
// Returns the response data from the server or throws an error if the request fails
export async function loginUser(user) {
    const loginUrl = 'http://localhost:4444/api/users/login';

    try {
        const response = await axios.post(loginUrl, user, {
      withCredentials: true, // Important for sending cookies
    });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.message);
        throw new Error(`Login failed: ${error.message}`);
    }
}   
//____________________________________GET USER BY ID____________________________________
// This function retrieves a user by their ID by sending a GET request to the server
// It expects a userId as a parameter
// Returns the response data from the server or throws an error if the request fails
export async function getUserById(userId) {
    const userUrl = `http://localhost:4444/api/users/${userId}`;

    try {
        const response = await axios.get(userUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error.message);
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}
//____________________________________GET USER BY USERNAME FOR AUTHENTICATION____________________________________
// This function retrieves a user by their username for authentication purposes
// It expects a username as a parameter
// Returns the user data or throws an error if the request fails
export async function getUserByUsernameForAuth(username) {
    const userUrl = `http://localhost:4444/api/users/username/${username}`;

    try {
        const response = await axios.get(userUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user by username:', error.message);
        throw new Error(`Failed to fetch user by username: ${error.message}`);
    }
}
//____________________________________DELETE USER BY ID____________________________________
// This function deletes a user by their ID by sending a DELETE request to the server
// It expects a userId as a parameter
// Returns the response data from the server or throws an error if the request fails
export async function deleteUserById(userId) {
    const deleteUrl = `http://localhost:4444/api/users/${userId}`;

    try {
        const response = await axios.delete(deleteUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to delete user:', error.message);
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}
//____________________________________UPDATE USER BY ID____________________________________
// This function updates a user's information by sending a PUT request to the server
// It expects a userId and an updated user object as parameters
// Returns the response data from the server or throws an error if the request fails
export async function updateUserById(userId, updatedUser) {
    const updateUrl = `http://localhost:4444/api/users/${userId}`;

    try {
        const response = await axios.put(updateUrl, updatedUser);
        return response.data;
    } catch (error) {
        console.error('Failed to update user:', error.message);
        throw new Error(`Failed to update user: ${error.message}`);
    }
}
//____________________________________GET ALL USERS____________________________________
// This function retrieves all users by sending a GET request to the server
// Returns the response data from the server or throws an error if the request fails
export async function getAllUsers() {
    const allUsersUrl = 'http://localhost:4444/api/users';

    try {
        const response = await axios.get(allUsersUrl);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all users:', error.message);
        throw new Error(`Failed to fetch all users: ${error.message}`);
    }
}


//____________________________________LOGOUT USER____________________________________
// This function logs out the current user by sending a POST request to the server
// It clears the session and user data
// Returns the response data from the server or throws an error if the request fails

export async function logoutUser(token) {
    const logoutUrl = 'http://localhost:4444/api/users/logout';

    try {
        const response = await axios.post(logoutUrl, {}, {
            withCredentials: true, // Important for sending cookies
            headers: {
                'Authorization': `Bearer ${token}` // Include token if needed
            }
        });
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.message);
        throw new Error(`Logout failed: ${error.message}`);
    }
}

    