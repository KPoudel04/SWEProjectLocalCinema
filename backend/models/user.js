let users = new Map();

class User {
    constructor(name,id, password, role){
        this.name = name;
        this.id = id;
        this.password = password;
        this.shifts = [];
        this.role = role;
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
    constructor(name,id, password, role){
        super(name,id, password, role);
    }
    createUser(name, userId, password) {
        const newUser = new User(name, userId, password);
        users.set(userId, newUser);
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
                elevatedUser = new superUser(user.name, user.id, user.password, 'superUser');
                users.set(uid, elevatedUser);
            }
        });
    }

}
class superUser extends User {
    constructor(name,id, password, role){
        super(name,id, password, role);
    }
    assignShift(shift, user){
        user.addShift(shift);
    }
    removeShift(shift, user){
        user.removeShift(shift);
    }

}
const admin = new sysAdmin('admin', '0', 'root', 'sysAdmin');
users.set('0', admin);

module.exports = {
    User,
    sysAdmin,
    superUser,
    users
}