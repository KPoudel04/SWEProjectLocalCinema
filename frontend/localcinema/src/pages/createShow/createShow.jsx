import React, { useState } from 'react';

function CreateShow() {
    const [showData, setShowData] = useState({
        name: '',
        startTime: '',
        endTime: '',
    });

    const handleChange = (e) => {
        setShowData({ ...showData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/shows/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(showData),
            });

            if (response.ok) {
                alert('Show created successfully!');
            } else {
                alert('Failed to create show.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating show.');
        }
    };

    return (
        <div>
            <h2>Create a New Show</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Show Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={showData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="text"
                        name="startTime"
                        value={showData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                     <label>End Time:</label>
                    <input
                        type="text"
                        name="endTime"
                        value={showData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Show</button>
            </form>
        </div>
    );
}

export default CreateShow;
