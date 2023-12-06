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
    getShowInfo(){
        return {
            name: this.name,
            id: this.id,
            time: this.time
        }
    }
}