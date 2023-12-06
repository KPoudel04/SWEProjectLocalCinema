let users = new Map();

class User {
    constructor(name,id, password){
        this.name = name;
        this.id = id;
        this.password = password;
        this.shifts = [];
    }
    addShift(shift){
        this.shifts.push(shift);
    }
    getShifts(){
        return this.shifts;
    }
    removeShift(shift){
        this.shifts = this.shifts.filter(s => s.id !== shift.id);
    }
}
class sysAdmin extends User{
    constructor(name,id, password){
        super(name,id, password);
    }
    createUser(name, userId, password) {
        const newUser = new User(name, userId, password);
        return newUser;
    }
    removeUser(uid){
        users.forEach((user) => {
            if (user.id === uid) {
                users.delete(uid);
            }
        });
    }
    elevateUser(uid){
        users.forEach((user) => {
            if (user.id === uid) {
                user = new superUser(user.name, user.id, user.password);
            }
        });
    }

}
class superUser extends User {
    constructor(name,id, password){
        super(name,id, password);
    }
    assignShift(shift, user){
        user.addShift(shift);
    }
    removeShift(shift, user){
        user.removeShift(shift);
    }

}
module.exports = {
    User,
    sysAdmin,
    superUser,
    users
}