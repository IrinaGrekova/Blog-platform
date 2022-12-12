import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';
import Header from '../../components/header';

const Layout = memo(() => {
    return (
        <div className={style['layout']}>
            <Header />
            <main className={style['main']}>
                <Outlet />
            </main>
        </div>
    );
});

export default Layout;