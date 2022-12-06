import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRegistration, errorNull } from '../../store/user-slice';
import { useStateUser } from '../../selectors/selectors';
import ErrorMessage from '../../components/error-message';
import SuccessMessage from '../../components/success-message';
import FormSignUp from '../../components/form-sign-up';
import Loader from '../../components/loader';

const SignUp = memo(() => {
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

    const userRegistration = (val) => {
        const newUser = {
            username: val.username.trim(),
            email: val.email.trim(),
            password: val.password.trim(),
        };
        dispatch(fetchUserRegistration(newUser));
    };

    // при закрытии окна ошибки
    const onCloseMessage = () => {
        // обнуляет ошибку в сторе
        dispatch(errorNull());
    };
    // сообщение об ошибке
    const errorAlert = error && <ErrorMessage description={error} closingAlert={onCloseMessage} />;

    // сообщение об успешной регистрации
    const successAlert = userData && <SuccessMessage description="Registration was successful!" closable={false} />;

    const form = !successAlert && status !== 'loading' && <FormSignUp callback={userRegistration} />;

    const loading = status === 'loading' && <Loader />;

    return (
        <>
            {errorAlert}
            {successAlert}
            {form}
            {loading}
        </>
    );
});

export default SignUp;