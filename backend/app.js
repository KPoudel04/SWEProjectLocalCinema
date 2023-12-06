const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { User, users } = require('./models/user.js');
const { Shift, shifts } = require('./models/shift.js');
const { Show, shows } = require('./models/show.js');

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
    const { userID } = req.params;
    const user = users.get(parseInt(userID));
    const shiftsArray = Array.from(user.getShifts().values());
    res.status(200).json(shiftsArray);
});

app.post('/users/:userID/reserveShift', (req, res) => {
    const { userID } = req.params;
    const { shiftID } = req.body;
    const user = users.get(parseInt(userID));
    const shift = shifts.get(parseInt(shiftID));
    user.addShift(shift);
    res.status(200).json(user);
});

app.post('/admin/createSuper', (req, res) => {
    const { name, password } = req.body;
    const id = generateID();
    const user = new superUser(name, id, password);
    users.set(id, user);   
    res.status(201).send(user);
});

app.post('/admin/assignShift', (req, res) => {
    const { userID, shiftID } = req.body;
    const user = users.get(parseInt(userID));
    const shift = shifts.get(parseInt(shiftID));
    user.addShift(shift);
    res.status(200).json(user);
});

app.delete('/admin/removeShift', (req, res) => {
    const { userID, shiftID } = req.body;
    const user = users.get(parseInt(userID));
    const shift = shifts.get(parseInt(shiftID));
    user.removeShift(shift);
    res.status(200).json(user);
});

app.delete('/users/:userID/remove', (req, res) => {
    const { userID } = req.params;
    users.delete(parseInt(userID));
    res.status(200).json(users);
});
app.post('/users/:userID/create', (req, res) => {
    const { name, password } = req.body;
    const id = generateID();
    const user = new User(name, id, password);
    users.set(id, user);   
    res.status(201).send(user);
});
app.patch('/admin/updateShift', (req, res) => {
    const { shiftID, newShiftTime } = req.body;
    const shift = shifts.get(parseInt(shiftID));
    shift.shiftTime = newShiftTime;
    res.status(200).json(shift);
});
app.get('/shows', (req, res) => {
    const showsArray = Array.from(shows.values()); 
    res.status(200).json(showsArray);
});
app.post('/shows/create', (req, res) => {
    const { name, time } = req.body;
    const id = generateID();
    const show = new Show(name, id, time);
    shows.set(id, show);   
    res.status(201).send(show);
});
app.get('/shows/:showID/shifts', (req, res) => {
    const { showID } = req.params;
    const show = shows.get(parseInt(showID));
    const shiftsArray = Array.from(show.getShifts().values());
    res.status(200).json(shiftsArray);
});

//Helper functions
let generatedID = 0;
let generateID = () => {
    return generatedID++;
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
