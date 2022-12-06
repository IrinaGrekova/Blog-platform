import React from 'react';
import { Link } from 'react-router-dom';
import { useStateUser } from '../../selectors/selectors';
import NotLogged from './not-logged';
import Logged from './logged';
import style from './header.module.scss';

const Header = () => {
    const { userData } = useStateUser();

    // если данные пользвателя есть в стор (пользователь залогинен), то показываем их
    const userDataShow = userData ? <Logged /> : <NotLogged />;

    return (
        <div className={style['header']}>
            <Link to="/articles" className={style['header__title']}>
                Realworld Blog
            </Link>
            <div className={style['header__user-information']}>{userDataShow}</div>
        </div>
    );
};

export default Header;