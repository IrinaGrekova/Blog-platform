/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useStateUser } from '../selectors/selectors';

const RequiredAuth = memo(({ children }) => {
    const { userData } = useStateUser();

    if (!userData) {
        return <Navigate to="/sign-in"  />;
    }
    return children;

});

export default RequiredAuth;