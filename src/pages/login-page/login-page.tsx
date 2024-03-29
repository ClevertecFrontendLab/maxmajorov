import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import {
    API_URL,
    VALIDATION_FIELD_NOT_REQUIRED,
    VALIDATION_FIELD_REQUIRED,
} from '@constants/general';
import { useReturnToken } from '@hooks/use-return-token';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import Google from '@public/google.svg?react';
import { ApiEndpoints } from '@redux/constants/api';
import { Paths } from '@routes/paths';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';

import { useAuthForm } from './hooks/use-auth-form';

import styles from './login-page.module.css';

export const LoginPage = () => {
    const [errorValidate, setErrorValidate] = useState<
        Record<keyof Omit<CredentialsType, 'remember' | 'confirmPassword'>, boolean>
    >({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const { form, onFinish, location, onCheckEmail } = useAuthForm();

    const token = useReturnToken();

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const googleAuthHandler = () => {
        window.location.href = `${API_URL}${ApiEndpoints.LOGIN_GOOGLE}`;
    };

    if (token) {
        return <Navigate to={Paths.MAIN} state={{ from: location }} />;
    }

    return (
        <React.Fragment>
            <Form
                form={form}
                onFinish={onFinish}
                requiredMark={false}
                onFieldsChange={onFieldsChange}
                scrollToFirstError={true}
                style={{ width: '100%' }}
            >
                <Form.Item name={AuthFieldNames.email} rules={VALIDATION_FIELD_EMAIL}>
                    <Input addonBefore='e-mail:' type='email' data-test-id='login-email' />
                </Form.Item>

                <Form.Item
                    name={AuthFieldNames.password}
                    className={styles.formItemInput}
                    rules={[VALIDATION_FIELD_REQUIRED, passwordValidator(true)]}
                >
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                        data-test-id='login-password'
                    />
                </Form.Item>

                <Form.Item
                    rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                    className={styles.rememberWrapper}
                >
                    <Form.Item
                        name={AuthFieldNames.remember}
                        valuePropName='checked'
                        noStyle={true}
                        rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                    >
                        <Checkbox className={styles.rememberMe} data-test-id='login-remember'>
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>
                    <Button
                        onClick={onCheckEmail}
                        disabled={errorValidate.email}
                        className={styles.forgotPassword}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item className={styles.formItemButton}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block={true}
                        className={styles.submitButton}
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Button
                type='primary'
                htmlType='button'
                block={true}
                className={styles.googleButton}
                onClick={googleAuthHandler}
                data-test-id='google-submit-button'
            >
                <div className={styles.googleButtonContainer}>
                    <Google className={styles.googleButtonIcon} />
                    <span className={styles.googleText}>Авторизация через Google</span>
                </div>
            </Button>
        </React.Fragment>
    );
};

export const RegPage = () => {
    const [errorValidate, setErrorValidate] = useState<
        Record<keyof Omit<CredentialsType, 'remember' | 'confirmPassword'>, boolean>
    >({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const { form, onFinish, from, location } = useAuthForm();

    const token = useReturnToken();

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const extraPassword = (
        <span
            className={classNames(styles.extra, {
                [styles.extraError]: errorValidate.password,
            })}
        >
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    if (token) {
        return <Navigate to={from || Paths.MAIN} state={{ from: location }} />;
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            onFieldsChange={onFieldsChange}
            scrollToFirstError={true}
            style={{ width: '100%' }}
        >
            <Form.Item name={AuthFieldNames.email} rules={VALIDATION_FIELD_EMAIL}>
                <Input addonBefore='e-mail:' type='email' data-test-id='registration-email' />
            </Form.Item>

            <Form.Item
                name={AuthFieldNames.password}
                className={styles.formItemInput}
                extra={extraPassword}
                rules={[VALIDATION_FIELD_REQUIRED, passwordValidator(true)]}
            >
                <Input.Password
                    type='password'
                    placeholder='Пароль'
                    data-test-id='registration-password'
                />
            </Form.Item>

            <Form.Item
                name={AuthFieldNames.confirmPassword}
                dependencies={[AuthFieldNames.password]}
                rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
            >
                <Input.Password
                    placeholder='Повторите пароль'
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>

            <Form.Item className={styles.formItemButton}>
                <Button
                    type='primary'
                    htmlType='submit'
                    block={true}
                    className={styles.submitButton}
                    data-test-id='registration-submit-button'
                >
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};
