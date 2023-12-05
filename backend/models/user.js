let users = new Map();

class User {
    constructor(name,id, password, superid){
        this.name = name;
        this.id = id;
        this.password = password;
        this.superid = superid;
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
module.exports = {
    User,
    users
}