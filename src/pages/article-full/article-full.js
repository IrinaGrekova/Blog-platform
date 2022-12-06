import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useStateUser } from '../../selectors/selectors';
import Article from '../../components/article';
import ErrorMessage from '../../components/error-message';
import SuccessMessage from '../../components/success-message';
import Loader from '../../components/loader';
import apiService from '../../services/apiService';

const ArticleFull = memo(() => {
    const { slug } = useParams(); // получает slug из роутера
    const [item, setItem] = useState({}); // отображаемый элемент
    const [isLoading, setLoading] = useState(true); // отображение лоадера
    const [isError, setIsError] = useState(false); // отобажение ошибки
    const [errorText, setErrorText] = useState(''); // текст ошибки
    const [isSuccess, setIsSuccess] = useState(false); // отобажение успех запроса
    const [controllerShow, setControllerShow] = useState(false);

    const { userData } = useStateUser();

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

    useEffect(() => {
        // получает статью по slug
        apiService
            .getArticleFull(slug, token)
            .then((res) => {
                // показывает контроллер если пользователь залогинен и username в стор сопадает с автором статьи
                if (userData && userData.username === res.article.author.username) {
                    setControllerShow(true);
                }

                setItem(res.article);
                setLoading(false);
                setIsError(false);
            })
            .catch(() => {
                setIsError(true);
                setErrorText('Data loading error. Please try reloading the page or try again later.');
                setLoading(false);
            });
    }, [slug, isLoading, userData, token]);

    const onCloseMessage = () => {
        setIsError(false);
        setErrorText('');
        setLoading(false);
    };

    // подтвердить удаление
    const confirmDeletion = () => {
        // удаляет статью
        apiService.deleteArticle(slug, token).then((res) => {
            // если первый символ статуса 2 (OK)
            if (String(res.status)[0] === '2') {
                setIsSuccess(true);
            } else {
                // если нет ошибка
                setErrorText(`error: ${res.status} ${res.statusText}`); // текст ошибки
                setIsError(true); // флаг ошибки
            }
        });
    };

    // отображает индикатор загрузки пока не получена статья
    const loading = isLoading && !isError && <Loader />;

    // отображает статью если объект не пустой (статья получена)
    const article = Object.keys(item).length !== 0 && !isSuccess && (
        <Article item={item} controllerFlag={controllerShow} confirmDeletion={confirmDeletion} />
    );
    // соообщение об ошибке
    const errorMessage = isError && <ErrorMessage description={errorText} closingAlert={onCloseMessage} />;

    // собщение об успехе
    const successMessage = isSuccess && !isError && (
        <SuccessMessage description="Article successfully removed!" closingAlert={onCloseMessage} closable={false} />
    );
    return (
        <>
            {errorMessage}
            {successMessage}
            {loading}
            {article}
        </>
    );
});

export default ArticleFull;