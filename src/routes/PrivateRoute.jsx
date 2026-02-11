import React from 'react';
import UseAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = UseAuth();

    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }
    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;