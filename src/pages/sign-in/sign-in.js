import React, { useEffect, memo } from 'react';
import {Navigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUserLogIn, errorNull } from '../../store/user-slice';
import { useStateUser } from '../../selectors/selectors';
import ErrorMessage from '../../components/error-message';
import SuccessMessage from '../../components/success-message';
import FormSignIn from '../../components/form-sign-in';
import Loader from '../../components/loader';


const SignIn = memo(() => {
    const dispatch = useDispatch();
    const { error, status, userData } = useStateUser();

    useEffect(() => {
        try {
            // если есть днные о юзере, то сохраняет токен в хранилище
            if (userData && userData !== null) {
                localStorage.setItem('token', JSON.stringify(userData.token));
            }
        } catch (e) {
            console.log(e);
        }
    }, [userData]);

    // получает данные их формы
    const userAuthorize = (val) => {
        const registrationData = {
            email: val.email.trim(),
            password: val.password.trim(),
        };
        // отправлет на сервер
        dispatch(fetchUserLogIn(registrationData));
    };

    // при закрытии окна ошибки
    const onCloseMessage = () => {
        // обнуляет ошибку в сторе
        dispatch(errorNull());
    };


    // сообщение об ошибке
    const errorAlert = error && <ErrorMessage description={error} closingAlert={onCloseMessage} />;

    // сообщение об успешной авторизации
    const successAlert = userData && <SuccessMessage description="Authorization was successful!" closable={false} />;

    // форма авторизации
    const form = !successAlert && status !== 'loading' && <FormSignIn callback={userAuthorize} />;

    // индикатор загрузки
    const loading = status === 'loading' && <Loader />;


    // автоматический редирект на список статей
    if (userData) {
        return <Navigate to="/articles" />
    }

    return (
        <>
            {errorAlert}
            {successAlert}
            {form}
            {loading}
        </>
    );
});

export default SignIn;