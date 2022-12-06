import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Popconfirm, Button } from 'antd';
import { useStateUser } from '../../selectors/selectors';
import style from './article-manager.module.scss';

const ArticleManager = ({ controllerFlag, confirmDeletion }) => {
    const { userData } = useStateUser();

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    // получает slug из роутера
    const { slug } = useParams();

    // показ модалки
    const showPopconfirm = () => {
        setVisible(true);
    };

    // если в модалке подтвердить действие
    const handleOk = () => {
        confirmDeletion();

        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 500);
    };

    // если нажать в модалке "No" закывает окно
    const handleCancel = () => {
        setVisible(false);
    };

    // кнопка удадения
    const deleteButton = (
        <Popconfirm
            placement="right"
            title="Are you sure to delete this article?"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            cancelText="No"
            okText="Yes"
        >
            <Button type="primary" onClick={showPopconfirm} className={style['controller-button__del']}>
                Delete
            </Button>
        </Popconfirm>
    );

    const paramSlug = `/articles/${slug}/edit`;

    const controler =
        controllerFlag && userData ? (
            <div className={style['controller-wrapper']}>
                {deleteButton}
                <Link to={paramSlug} className={style['controller-button__edit']}>
                    <span>Edit</span>
                </Link>
            </div>
        ) : null;

    return controler;
};

export default ArticleManager;