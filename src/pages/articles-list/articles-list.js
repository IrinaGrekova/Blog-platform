import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { paginationPageChange, fetchGetArticlesByPageNum } from '../../store/article-slice';
import { useStateArticles } from '../../selectors/selectors';
import style from './articles-list.module.scss';
import ArticlePreview from '../../components/article-preview';
import ErrorMessage from '../../components/error-message';
import Loader from '../../components/loader';

const ArticlesList = memo(() => {

    const dispatсh = useDispatch();

    // получает данные о статьях из стора
    const { maxPages, activePage, list, status, error } = useStateArticles();

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

    useEffect(() => {
        // получает список статей по номеру страницы
        dispatсh(fetchGetArticlesByPageNum([(activePage - 1) * 5, token]));
    }, [activePage, dispatсh, token]);

    const onChangePage = (pageNum) => {
        // передает в стор номер актоивной страницы
        dispatсh(paginationPageChange(pageNum));
    };

    const articlesList = list && (
        <ul className={style['articles-list']}>
            {list.map((el) => (
                <li key={el.slug}>
                    <ArticlePreview item={el} controllerFlag={false} />
                </li>
            ))}
        </ul>
    );

    const loading = status === 'loading' && <Loader />;

    const errorMessage = error && <ErrorMessage description={error} type="error" />;

    const pagination = list && (
        <Pagination
            className={style['ant-pagination']}
            showQuickJumper
            showSizeChanger={false}
            current={activePage}
            total={maxPages * 10}
            onChange={onChangePage}
        />
    );

    return (
        <>
            {loading}
            {errorMessage}
            {articlesList}
            {pagination}
        </>
    );
});

export default ArticlesList;