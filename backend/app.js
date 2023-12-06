const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { User, users } = require('./models/user.js');
const { Shift, shifts } = require('./models/shift.js');


// Middleware for API key authentication
//Need to implement this
const apiKeyAuth = (req, res, next) => {
    next();
};

app.use(apiKeyAuth); 

// Routes
app.post('/signup', (req, res) => {
    const { name, password } = req.body;
    const id = generateID();
    const user = new User(name, id, password);
    users.set(id, user);   
    res.status(201).send(user);
});

app.post('/signin', (req, res) => {
    const { name, password } = req.body;
    let foundUser = null;

    users.forEach((user) => {
        if (user.name === name && user.password === password) {
            foundUser = user;
        }
    });

    if (foundUser) {
        res.status(200).send(foundUser);
    } else {
        res.status(401).send('Invalid credentials');
    }
});
app.get('/users', (req, res) => {
    const usersArray = Array.from(users.values()); 
    res.status(200).json(usersArray);
});

app.get('/users/:userID/shifts', (req, res) => {
    
});

app.post('/users/:userID/reserveShift', (req, res) => {
    // Logic for reserving a shift for a user
});

app.post('/admin/createSuper', (req, res) => {
    // Logic for creating a super user
});

app.post('/admin/assignShift', (req, res) => {
    // Logic for assigning a shift to a user
});

app.delete('/admin/removeShift', (req, res) => {
    // Logic for removing a shift from a user
});

app.delete('/users/:userID/remove', (req, res) => {
    // Logic for deleting a user account
});
app.post('/users/:userID/create', (req, res) => {
    // Logic for deleting a user account
});

app.put('/admin/updateShift', (req, res) => {
    // Logic for updating a shift
});
// app.get('/shows', showRoutes), (req, res) => {
//     // Logic for getting all shows
// }
//Helper functions
let generatedID = 0;
let generateID = () => {
    return generatedID++;
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
