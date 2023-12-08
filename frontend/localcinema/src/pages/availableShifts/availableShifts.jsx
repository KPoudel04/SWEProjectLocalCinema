import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../userContext/usercontext';

const AvailableShifts = () => {
    const [shifts, setShifts] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:3000/shifts/available')
            .then(response => {
                setShifts(response.data);
            })
            .catch(error => console.error('Error fetching available shifts:', error));
    }, []);

    const handleTakeShift = (shiftID) => {
        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }

        axios.post(`http://localhost:3000/shifts/${shiftID}/assign`, { shiftID, userID: user.id })
            .then(response => {
                setShifts(shifts.filter(shift => shift.shiftID !== shiftID));
            })
            .catch(error => console.error('Error taking shift:', error));
    };

    return (
        <div>
            <h2>Available Shifts</h2>
            <ul>
                {shifts.map(shift => (
                    <li key={shift.shiftID}>
                        {shift.shiftTime} - {shift.shiftMovie}
                        <button onClick={() => handleTakeShift(shift.shiftID)}>Take Shift</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableShifts;
