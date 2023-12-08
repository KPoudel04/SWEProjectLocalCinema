const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { Shift, shifts } = require('./models/shift.js');
const { Show, shows } = require('./models/show.js');
const { User, superUser, sysAdmin, users } = require('./models/user.js');


// Middleware for API key authentication
//Need to implement this
const apiKeyAuth = (req, res, next) => {
    next();
};

app.use(apiKeyAuth); 

// Routes
app.get('/shifts/available', (req, res) => {
    const availableShifts = Array.from(shifts.values()).filter(shift => shift.shiftUser === 'Available');
    res.status(200).json(availableShifts);
});
app.post('/signup', (req, res) => {
    const { name, password } = req.body;
    const id = generateID();
    const user = new User(name, id, password, 'user');
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
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const shiftsArray = Array.from(user.getShifts());
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

app.put('/admin/elevateUser/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.get(parseInt(userId));
    if (user) {
        const elevatedUser = new superUser(user.name, userId, user.password, 'superUser');
        users.set(user.id, elevatedUser);
        res.status(200).send(elevatedUser);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

app.post('/shifts/:shiftID/assign',(req, res) => {
    const { shiftID } = req.params;
    const { userID } = req.body; 
    const shift = shifts.get((shiftID));
    const user = users.get((userID));
    if (shift && user) {
        shift.shiftUser = user.name;
        user.addShift(shift);
        res.status(200).json(shift);
    } else {
        res.status(404).send({ message: "Shift not found or already assigned" });
    }
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
app.get('/shows/:showID', (req, res) => {
    const { showID } = req.params;
    const show = shows.get(showID);

    if (show) {
        const shiftsArray = show.getShifts();
        res.status(200).json({ show: show.getShowInfo(), shifts: shiftsArray });
    } else {
        res.status(404).send({ message: "Show not found" });
    }
});


app.post('/shows/create', (req, res) => {
    const { name, startTime, endTime } = req.body;
    const id = generateShowID();
    const show = new Show(name, id, startTime, endTime);
    shows.set(id, show);   
    res.status(201).send(show);
});


//Helper functions
let generatedID = 1;
let generateID = () => {
    return generatedID++;
}
let showGenID = 3;
let generateShowID = () => {
    return showGenID++;
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
