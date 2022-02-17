import React, {useContext} from 'react'
import {AuthContext} from '../context/auth'
// import { Menu } from 'semantic-ui-react'
import {Link,useNavigate} from 'react-router-dom'
import './styles/Navigation.css'
import Boba from '../images/boba.png';

function Navigation () {
    // const {user} = useContext(AuthContext)
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        logout();
        navigate('/');
    } 

    function navigateHome(e) {
        e.preventDefault();
        navigate('/home');
    }

    return (
        <div className='topbar'>
            <img src={Boba} alt='Boba tracker icon' height={30} width={30} onClick={navigateHome} style={{cursor: "pointer", marginLeft: "1rem"}}/><h2>Boba Tracker</h2>
            <div className='topbar-navigation'>
                {/* to={`/posts/${id}`} */}
                <Link to={`/home`} className='topbar-link'>Home</Link>
                {/* <Link to={`/myboba/${user.id}`} className='topbar-link'>My Boba</Link> */}
                <p onClick={handleLogout} className='topbar-link'>Logout</p>
            </div>
        </div>
    )
}

export default Navigation