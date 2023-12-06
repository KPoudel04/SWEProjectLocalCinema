import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext/usercontext';


function Dashboard(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    return (
        <React.Fragment>
        <div>
            <h1>Dashboard</h1>
        </div>
        <button>
            Show shifts
        </button>
        <button>
            Show movies
        </button>
        {user && user.role === 'sysadmin' && (
            <React.Fragment>
            <button onClick={() => navigate('/createShow')}>
                Create Show
            </button>
            <button onClick={() => navigate('/elevateUser')}>
                Elevate User
            </button>
        </React.Fragment>
        )}
        </React.Fragment>
    );
}
export default Dashboard;