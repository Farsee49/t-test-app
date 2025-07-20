const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const catchAsync = require('../utils/catchAsync');



createUser = catchAsync(async  ({username, password}) => {
  
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const query = `
        INSERT INTO users(username, password)
        VALUES($1, $2)
        RETURNING *;
        `;

        const {rows: [user]} = await client.query(query, [username, hashedPassword]);
        delete user.password;
        return user;
})

getAllUsers = catchAsync(async () => {
    const query = `
        SELECT * FROM users;
    `;
    const {rows: users} = await client.query(query);
    return users;
});

getUserById = catchAsync(async (id) => {
   
        const query = `
        SELECT * FROM users
        WHERE id=$1;
        `;
        const {rows: [user]} = await client.query(query, [id]);
        return user;
});

module.exports = {
    createUser,
    getAllUsers,
    getUserById
}