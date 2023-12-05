let shifts = new Map();
class Shift {
    constructor(shiftID, shiftTime, shiftUser) {
        this.shiftID = shiftID;
        this.shiftTime = shiftTime;
        this.shiftUser = shiftUser;
    }
    getShifts() {
        return this.shifts;
    }
    getShiftUser() {
        return this.shiftUser;
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
