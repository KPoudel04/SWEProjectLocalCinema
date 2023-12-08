let shifts = new Map();
class Shift {
    constructor(shiftID, shiftTime, shiftUser, shiftMovie) {
        this.shiftID = shiftID;
        this.shiftTime = shiftTime;
        this.shiftUser = shiftUser;
        this.shiftMovie = shiftMovie;

    }
    createShift(shift) {
        this.shifts.push(shift);
    }
    deleteShift(shift) {
        this.shifts = this.shifts.filter(s => s.id !== shift.id);
    }
    
}
module.exports = {
    Shift,
    shifts
}
