import React, {useContext,useEffect} from 'react';
import Navigation from '../components/Navigation.js';
import {AuthContext} from '../context/auth';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

import BobaForm from '../components/BobaForm.js';

function Create () {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    // Runs after every event. Runs when the page first loads as well
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })

    return (
        <>
            <Navigation/>
            <div className='home'>
                <BobaForm/>
            </div>
        </>
    )
}

export default Create