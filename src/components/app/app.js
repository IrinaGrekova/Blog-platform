import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserSave } from '../../store/user-slice';
import Layout from '../../pages/layout';
import ArticlesList from '../../pages/articles-list';
import ArticleFull from '../../pages/article-full';
import SignIn from '../../pages/sign-in';
import SignUp from '../../pages/sign-up';
import Profile from '../../pages/profile';
import CreateArticle from '../../pages/create-article';
import ArticleEdit from '../../pages/article-edit';
import RequiredAuth from '../../HOC/required-auth';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            // если токен есть то получаем данные пользователя с его использованием
            if (JSON.parse(localStorage.getItem('token'))) {
                dispatch(fetchUserSave(JSON.parse(localStorage.getItem('token'))));
            }
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Navigate to="/articles" />} />
                <Route path="/articles" element={<ArticlesList />} />
                <Route path="/articles/:slug" element={<ArticleFull />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                    path="/profile"
                    element={
                        <RequiredAuth>
                            <Profile />
                        </RequiredAuth>
                    }
                />
                <Route
                    path="/new-article"
                    element={
                        <RequiredAuth>
                            <CreateArticle />
                        </RequiredAuth>
                    }
                />
                <Route
                    path="/articles/:slug/edit"
                    element={
                        <RequiredAuth>
                            <ArticleEdit />
                        </RequiredAuth>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;