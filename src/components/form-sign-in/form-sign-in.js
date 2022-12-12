import React from 'react';
import PropTypes from 'prop-types';
import {Link, Navigate} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import style from './form-sign-in.module.scss'

const FormSignIn = ({ callback }) => {
    return (
        <Form
            layout="vertical"
            name="normal_login"
            size="large"
            className={style['ant-form']}
            initialValues={{
                remember: true,
            }}
            onFinish={(val) => {
                callback(val);
            }}
        >
            <div className={style['form-title']}>
                <span>Sign In</span>
            </div>

            <Form.Item
                className={style['ant-form-item']}
                label="Email address"
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item
                className={style['ant-form-item']}
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item className={style['ant-form-item-control-input-content']}>
                <Button type="primary" htmlType="submit" className={style['login-form-button']}>
                    Log in
                </Button>
                <span>
          Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
            </Form.Item>
        </Form>
    );
};

FormSignIn.propTypes = {
    callback: PropTypes.func.isRequired,
};

export default FormSignIn;