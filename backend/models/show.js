const { Shift, shifts } = require('./shift.js');
let shows = new Map();

class Show {
    constructor(name, id, startTime, endTime) {
        this.name = name;
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.shifts = [];

        for (let i = 0; i < 3; i++) {
            const shiftId = `${name}-${i}`;
            const newShift = new Shift(shiftId, `${startTime} - ${endTime}`, 'Available', name);
            this.shifts.push(newShift);
            shifts.set(shiftId, newShift); 
        }
    }
    addShift(shift) {
        this.shifts.push(shift);
    }
    getShifts() {
        return this.shifts;
    }
    removeShift(shift) {
        this.shifts = this.shifts.filter(s => s.id !== shift.id);
    }
    getId(){
        return this.id;
    }
    getShowInfo(){
        return {
            name: this.name,
            id: this.id,
            startTime: this.startTime,
            endTime: this.endTime
        }
    }
}
const show1 = new Show("Moana", '0', "2/3/2023 11:00", "2/3/2023 12:00")
shows.set(show1.getId(), show1)
const show2 = new Show("Roana", '1', "2/3/2023 11:00", "2/3/2023 12:00")
shows.set(show2.getId(), show2)
const show3 = new Show("Toana", '2', "2/3/2023 11:00", "2/3/2023 12:00")
shows.set(show3.getId(), show3)

module.exports = {
    Show,
    shows
}