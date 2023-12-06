import React from 'react';

class Show extends React.Component {
    constructor () {
        super();
        this.id = {int: null};
        //the id is set to null of a new instance of a Show 
        this.time = {String: null };
        // The time of a Show is set to null of  new instance of a Show
         
        
    }
    createAShow(Show, id, time)
    {
        const instance = new Show(id, time)
        return instance;
        //A new instance of a Show is create by given id and a timeslot of the given show
    }

    ViewAShowByID(id){
        // return a given by the ID of the show  
        const id = id;
        const instance = Show.id.time;

        return instance
        
    }
    ViewAShowByTime(id){
        // return a given by the time of the show  
        const time =time;
        const instance = Show.id.time;
        return instance
    }
    render() {
        return <h2> Show!</h2>;
      }
}
const show1 = new Show(null, null);
