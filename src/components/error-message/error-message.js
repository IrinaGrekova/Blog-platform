import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import style from './error-message.module.scss';

const ErrorMessage = ({ description, closingAlert }) => {
    return (
        <div className={style['error-message']}>
            <Alert message="Error" description={description} type="error" showIcon closable onClose={() => closingAlert()} />
        </div>
    );
};

ErrorMessage.defaultProps = {
    description: '',
};

ErrorMessage.propTypes = {
    description: PropTypes.string,
    closingAlert: PropTypes.func,
};

export default ErrorMessage;