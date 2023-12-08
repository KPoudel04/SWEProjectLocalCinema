import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext/usercontext';
import { useNavigate } from 'react-router-dom';
const ShowShifts = () => {
    const [show, setShow] = useState(null);
    const [shifts, setShifts] = useState([]);
    const { user } = useContext(UserContext);
    const { showID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user || !user.id) {
          console.error('User ID is undefined.');
          return;
      }
  
      console.log(`Fetching details for show ID: ${showID}`);
  
      axios.get(`http://localhost:3000/shows/${showID}`)
    .then(response => {
        setShow(response.data.show);
        setShifts(response.data.shifts); 
        console.log(response.data.shifts);
    })
    .catch(error => console.error('Error fetching show details:', error));
  }, [showID, user]);
  
  if (!show) {
    return <div>Loading show details...</div>;
}

    const handleAssignShift = (shiftID) => {
        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }
        axios.post(`http://localhost:3000/shifts/${shiftID}/assign`, { shiftID, userID: user.id })
            .then(response => {
                setShifts(shifts.map(shift => shift.id === shiftID ? { ...shift} : shift));
            }).then(() => {
                console.log('Shift assigned successfully');
                navigate('/dashboard')
            })
            .catch(error => console.error('Error assigning shift:', error));
    };
    return (
      <div>
          <h2>{show.name}</h2>
          <p>Show Time: {show.startTime} - {show.endTime}</p>
          <h3>Shifts:</h3>
          <ul>
    {shifts.map((shift, index) => (
        <li key={`${shift.shiftID}-${index}`}>
            {shift.shiftTime} - {shift.shiftMovie} - {shift.shiftUser}
            {shift.shiftUser === "Available" && (
                <button onClick={() => handleAssignShift(shift.shiftID)}>Assign to Me</button>
            )}
        </li>
    ))}
</ul>
      </div>
  );
};

export default ShowShifts;
