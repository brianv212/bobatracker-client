import React, {useContext,useEffect} from 'react';
import Navigation from '../components/Navigation.js';
import {AuthContext} from '../context/auth';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

import Timer from '../components/CurrentTime';
import MyBoba from './MyBoba.js';

function Home () {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    // Runs after every event. Runs when the page first loads as well
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })

    function navigateToBoba(e) {
        e.preventDefault();
        navigate('/createboba');
    }

    return (
        <>
            <Navigation/>
            <Timer/>
            <div className='home'>
                <button className='home-button' onClick={navigateToBoba}>I had boba today!</button>
            </div>
            <MyBoba/>
        </>
    )
}

export default Home