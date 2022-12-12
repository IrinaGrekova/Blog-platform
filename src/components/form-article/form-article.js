import React from 'react';
import PropTypes from 'prop-types';
import CompletedForm from "./completed-form";

import './form-article.module.scss'

const FormArticle = ({ transferData, title, description, articleTitle, articleBody, tagList }) => {
    const onFinish = (val) => {
        transferData(val);
    };

    return (
        <CompletedForm
            transferData={onFinish}
            title={title}
            description={description}
            articleTitle={articleTitle}
            articleBody={articleBody}
            tagList={tagList}
        />
    );
};

FormArticle.defaultProps = {
    title: '',
    description: '',
    articleTitle: '',
    articleBody: '',
    tagList: [],
};

FormArticle.propTypes = {
    transferData: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    articleTitle: PropTypes.string,
    articleBody: PropTypes.string,
    tagList: PropTypes.array,
};

export default FormArticle;