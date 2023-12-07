let shows = new Map();

class Show {
    constructor(name, id, time) {
        this.name = name;
        this.id = id;
        this.time = time;
        this.shifts = [];
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
            time: this.time
        }
    }
}
const show1 = new Show("Moana", '0', "2/3/2023 11:00")
shows.set(show1.getId(), show1)
const show2 = new Show("Roana", '1', "2/3/2023 11:00")
shows.set(show2.getId(), show2)
const show3 = new Show("Toana", '2', "2/3/2023 11:00")
shows.set(show3.getId(), show3)

module.exports = {
    Show,
    shows
}