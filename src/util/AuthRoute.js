// Checks if we're logged in and we try to access certain pages

import React, {useContext} from 'react';
import {Route, Navigate} from 'react-router-dom';
import {AuthContext} from '../context/auth';
                //  Destructuring, Alias, ??? <- unneeded?
function AuthRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={props => 
                user ? <Navigate replace to="/"/> : <Component {...props}/>
            }        
        />
    )
}

export default AuthRoute