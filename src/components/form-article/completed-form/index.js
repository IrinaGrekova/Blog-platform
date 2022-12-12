import React, { useState, useEffect } from 'react';
import CustomizedForm from '../customize-form';

// если значения переданы, то использует их
const CompletedForm = ({ transferData, title, description, articleTitle, articleBody, tagList }) => {
    const newFields = [
        {
            name: ['title'],
            value: articleTitle || null,
        },
        {
            name: ['description'],
            value: description || null,
        },
        {
            name: ['body'],
            value: articleBody || null,
        },
        {
            name: ['tagList'],
            value: tagList && tagList.length ? tagList : [''],
        },
    ];

    const [fields, setFields] = useState(newFields);

    useEffect(() => {
        setFields(newFields);
    }, [title, description, articleTitle, articleBody, tagList]);

    return <CustomizedForm fields={fields} transferData={transferData} title={title} />;
};

export default CompletedForm;