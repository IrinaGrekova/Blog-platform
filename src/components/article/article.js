import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticlePreview  from '../article-preview';
import style from './article.module.scss';

const Article = ({ item, controllerFlag, confirmDeletion }) => {
    return (
        <article className={style['article']}>
            <ArticlePreview item={item} controllerFlag={controllerFlag} confirmDeletion={confirmDeletion} />
            <div className={style['article__body']}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
            </div>
        </article>
    );
};

Article.defaultProps = {
    controllerFlag: false,
};

Article.propTypes = {
    item: PropTypes.shape({
        body: PropTypes.string,
    }).isRequired,
    controllerFlag: PropTypes.bool,
    confirmDeletion: PropTypes.func.isRequired,
};
export default Article;