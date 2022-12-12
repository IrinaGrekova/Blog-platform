import React from 'react';
import PropTypes from 'prop-types';
import style from './header-button.module.scss';

const HeaderButton = ({ text }) => {
    return (
        <button type="button" className={style['header__button']}>
            {text}
        </button>
    );
};

HeaderButton.defaultProps = {
    text: '',
};

HeaderButton.propTypes = {
    text: PropTypes.string,
};

export default HeaderButton;