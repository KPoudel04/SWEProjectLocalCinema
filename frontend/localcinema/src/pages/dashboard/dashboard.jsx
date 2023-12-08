import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/usercontext';
import './dashboard.css';
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return(
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <button className="dashboard-button" onClick={() => navigate('/shifts/available')}>
        Available shifts
      </button>
      <button className="dashboard-button" onClick={() => navigate('/shows')}>
        Show movies
      </button>
      <button className="dashboard-button" onClick={() => navigate('/users')}>
        Users
      </button>
      {user && user.role === 'sysAdmin' && (
        <div className="admin-section">
          <button className="dashboard-button" onClick={() => navigate('/admin/createShow')}>
            Create Show
          </button>
          <button className="dashboard-button" onClick={() => navigate('/admin/elevateUser')}>
            Elevate User
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
