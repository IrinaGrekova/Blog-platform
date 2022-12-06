import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStateUser } from '../../../selectors/selectors';
import { logOutUser } from '../../../store/user-slice';
import HeaderButton from '../header-button';
import style from './logged.module.scss';
import avatarPlug from '../../../image/avatar-icon.png';

const Logged = () => {
    const { userData } = useStateUser();
    const { username, image } = userData;

    const dispath = useDispatch();

    const avatar = image || avatarPlug;

    const logOut = () => {
        try {
            // удаляет token из localStorage
            localStorage.removeItem('token');
            // и очищает данные пользователя в сторе
            dispath(logOutUser());
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={style['user-data']}>
            <Link to="/new-article">
                <button type="button" className={style['user-data__button']}>
                    Create article
                </button>
            </Link>

            <Link to="/profile">
                <div className={style['user-data__wrapper-inner']}>
                    <span>{username}</span>
                    <img src={avatar} alt="avatar" />
                </div>
            </Link>

            <div role="button" tabIndex={0} onClick={logOut} onKeyDown={logOut}>
                <HeaderButton text="Log Out" />
            </div>
        </div>
    );
};

export default Logged;