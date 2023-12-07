import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/usercontext';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/showShifts')}>
        Show shifts
      </button>
      <button onClick={() => navigate('/shows')}>
        Show movies
      </button>
      <button onClick={() => navigate('/users')}>
        Users
      </button>
      {user && user.role === 'sysadmin' && (
        <>
          <button onClick={() => navigate('/createShow')}>
            Create Show
          </button>
          <button onClick={() => navigate('/elevateUser')}>
            Elevate User
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
