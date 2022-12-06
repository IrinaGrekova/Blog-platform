import React from 'react';
import { Link } from 'react-router-dom';
import HeaderButton from '../header-button';

const NotLogged = () => {
    return (
        <div>
            <Link to="/sign-in">
                <HeaderButton text="Sign In" />
            </Link>
            <Link to="/sign-up">
                <HeaderButton text="Sign Up" />
            </Link>
        </div>
    );
};

export default NotLogged;