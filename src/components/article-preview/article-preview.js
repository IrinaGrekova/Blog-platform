import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStateUser } from '../../selectors/selectors';
import formCreateDate from '../../date';
import style from './article-preview.module.scss';
import likeIconEmpty from '../../image/like-empty-icon.png';
import likeIconFill from '../../image/like-fill-icon.png';
import avatarIcon from '../../image/avatar-icon.png';
import apiService from '../../services/apiService';
import ArticleManager from '../article-manager';

const ArticlePreview = ({ item, controllerFlag, confirmDeletion }) => {
    const { title, favorite, favoritesCount, tagList, author, description, createdAt, slug } = item;
    const { username: authorName, image: authorAvatar } = author;

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

    // строка с датой создания
    const createDate = formCreateDate(createdAt);

    // вернет аватар если он будет, если нет, то заглушку
    const avatar = authorAvatar === 'null' ? avatarIcon : authorAvatar;

    // вернет список тегов
    // eslint-disable-next-line react/no-array-index-key
    const tags = tagList.map((el, i) => el.length && <li key={i}>{el}</li>);

    // динамичекий параметр передаваемый в роутер
    const paramSlug = `/articles/${slug}`;

    // переменные для работы с лайками
    const [like, setLike] = useState(favorite);
    const [likeIcon, setLikeIcon] = useState(likeIconEmpty);
    const [likeCount, setLikeCount] = useState(favoritesCount);
    const [isLikeDisabled, setLikeDisabled] = useState(true);

    // данные пользователя из стор
    const { userData } = useStateUser();

    useEffect(() => {
        // если есть лайк меняет иконку
        if (favorite) {
            setLike(true);
            setLikeIcon(likeIconFill);
        }

        // если пользователь авторизован
        if (userData) {
            // то кнопка лайка разблокирована
            setLikeDisabled(false);
        }
    }, [userData, favorite]);

    const onlikeClick = () => {
        // если лайк не стоит
        if (!like) {
            // добавляет в избранное
            apiService.postAddFavorites(slug, token).then((res) => {
                // при получении корректного ответа сервера изменяет иконку и счетчик
                if (res.article.favorited) {
                    setLike(true);
                    setLikeIcon(likeIconFill);
                    setLikeCount(res.article.favoritesCount);
                }
            });
        }
        // если лайк стоит
        else {
            // то удаляет из избранного
            apiService.deleteFavorites(slug, token).then((res) => {
                // при получении корректного ответа сервера изменяет иконку и счетчик
                if (!res.article.favorited) {
                    setLike(false);
                    setLikeIcon(likeIconEmpty);
                    setLikeCount(res.article.favoritesCount);
                }
            });
        }
    };

    return (
        <div className={style['article-preview']}>
            <div className={style['article-preview__header']}>
                <div>
                    <div className={style['article-preview__title-wrapper']}>
                        <Link to={paramSlug} className={style['article-preview__article-title']}>
                            {title}
                        </Link>
                        <div className={style['article-preview__article-likes']}>
                            <button
                                type="button"
                                className={style['article-preview__button-likes']}
                                onClick={onlikeClick}
                                disabled={isLikeDisabled}
                            >
                                <img src={likeIcon} alt="ilke-icon" />
                            </button>
                            <span className={style['article-preview__likes-count']}>{likeCount}</span>
                        </div>
                    </div>
                    <ul className={style['article-preview__tags-list']}>{tags}</ul>
                </div>
                <div className={style['article-preview__author']}>
                    <div className={style['article-preview__author-wrapper']}>
                        <span className={style['article-preview__author-name']}>{authorName}</span>
                        <span className={style['article-preview__publication-date']}>{createDate}</span>
                    </div>
                    <img src={avatar} alt="avatar" className={style['article-preview__author-avatar']} />
                </div>
            </div>
            <div className={style['article-preview__content']}>
                <p className={style['article-preview__text']}>{description}</p>
                <ArticleManager controllerFlag={controllerFlag} confirmDeletion={confirmDeletion} />
            </div>
        </div>
    );
};

ArticlePreview.defaultProps = {
    controllerFlag: false,
    item: {
        title: '',
        favorite: false,
        favoritesCount: null,
        tagList: [],
        author: PropTypes.shape({
            username: '',
            image: null,
        }),
        description: '',
        createdAt: '',
        slug: '',
    },
};

ArticlePreview.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        favorite: PropTypes.bool,
        favoritesCount: PropTypes.number,
        tagList: PropTypes.array,
        author: PropTypes.shape({
            username: PropTypes.string,
            image: PropTypes.string,
        }),
        description: PropTypes.string,
        createdAt: PropTypes.string,
        slug: PropTypes.string,
    }),
    controllerFlag: PropTypes.bool,
    confirmDeletion: PropTypes.func,
};

export default ArticlePreview;