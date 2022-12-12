import React, { useState, useEffect, memo } from 'react';
import {useParams, Navigate} from 'react-router-dom';
import FormArticle from '../../components/form-article';
import ErrorMessage from '../../components/error-message';
import SuccessMessage from '../../components/success-message';
import Loader from '../../components/loader';
import apiService from '../../services/apiService';

const ArticleEdit = memo(() => {
    const { slug } = useParams(); // получает slug из роутера

    const [articleTitle, setArticleTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [tagList, setTagList] = useState([]);

    const [isLoading, setLoading] = useState(false); // отображение лоадера
    const [isError, setIsError] = useState(false); // отобажение ошибки
    const [errorText, setErrorText] = useState(''); // текст ошибки
    const [isSuccessAlert, setSuccessAlert] = useState(false); // сообщение об успешном изменении

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

    // обновляет данные в полях формы
    const updateFormData = () => {
        apiService.getArticleFull(slug, token).then((res) => {
            setTagList(res.article.tagList);
            setDescription(res.article.description);
            setArticleTitle(res.article.title);
            setArticleBody(res.article.body);
        });
    };

    useEffect(() => {
        updateFormData();
    }, []);

    // обновляет статью
    const articleUpdate = (val) => {
        const modifiedArticle = {
            title: val.title.trim(),
            description: val.description.trim(),
            body: val.body,
            // любое положительное значение + удалит пробелы по краям
            tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
        };

        setLoading(true);

        apiService
            .putArticleUpdate(slug, modifiedArticle, token)
            .then((res) => {
                if (res.article) {
                    setLoading(false);
                    setSuccessAlert(true);

                    updateFormData(); // обновляет данные в форме
                }
                if (res.errors) {
                    setLoading(false);
                    setIsError(true);
                    const errorStr = `${res.errors.error.status} ${res.errors.message}`;
                    setErrorText(errorStr);
                }
            })
            .catch(() => {
                setLoading(false);
                setIsError(true);
                setErrorText('Data loading error. Please try reloading the page or try again later.');
            });
    };

    // при закрытии сообщения об успехе или ошибке
    const atCloseAlert = () => {
        setSuccessAlert(false);
        setIsError(false);
    };

    const form = !isLoading && !isError && !isSuccessAlert && (
        <FormArticle
            title="Edit article"
            tagList={tagList}
            description={description}
            articleTitle={articleTitle}
            articleBody={articleBody}
            transferData={articleUpdate}
        />
    );

    const loader = isLoading && <Loader />;

    const errorAlert = isError && <ErrorMessage description={errorText} closingAlert={atCloseAlert} />;

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Article update successfully!" closingAlert={atCloseAlert} closable={true} />
    );

    // редирект на список статей
    if (successAlert) {
        return <Navigate to="/articles" />
    }

    return (
        <>
            {successAlert}
            {errorAlert}
            {form}
            {loader}
        </>
    );
});

export default ArticleEdit;