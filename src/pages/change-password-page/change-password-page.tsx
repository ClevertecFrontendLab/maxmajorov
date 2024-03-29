import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthFieldNames } from '@common-types/credentials';
import { VALIDATION_FIELD_REQUIRED } from '@constants/general';
import { useReturnToken } from '@hooks/use-return-token';
import { VALIDATION_CONFIRM_PASSWORD } from '@pages/login-page/constants/common';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { Paths } from '@routes/paths';
import { CustomSpace } from '@shared/components/custom-space';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, Form, Input, Typography } from 'antd';
import classNames from 'classnames';

import styles from './change-password-page.module.css';

export const ChangePasswordPage = () => {
    const [errorPassword, setErrorPassword] = useState(false);
    const { form, onFinish, from, location } = useAuthForm();
    const token = useReturnToken();

    const isCameFromConfirmEmailPage =
        from?.pathname.includes(Paths.CONFIRM_EMAIL) ||
        from?.pathname.includes(Paths.ERROR_CHANGE_PASSWORD);

    const extraPassword = (
        <span
            data-test-id='password-invalid-sign'
            className={classNames(styles.extra, {
                [styles.extraError]: errorPassword,
            })}
        >
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.password]);
        const isErrorPassword = errors[0].errors.length > 0;

        setErrorPassword(isErrorPassword);
    };

    if (token) {
        return <Navigate to={from || Paths.MAIN} state={{ from: location }} />;
    }

    if (!isCameFromConfirmEmailPage) {
        return <Navigate to={from || Paths.AUTH} state={{ from: location }} />;
    }

    return (
        <CustomSpace direction='vertical' size={20} align='center'>
            <Typography.Title className={styles.title} level={3}>
                Восстановление аккауанта
            </Typography.Title>
            <Form
                form={form}
                onFinish={onFinish}
                requiredMark={false}
                onFieldsChange={onFieldsChange}
                scrollToFirstError={true}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name={AuthFieldNames.password}
                    className={styles.formItemInput}
                    extra={extraPassword}
                    rules={[VALIDATION_FIELD_REQUIRED, passwordValidator(true)]}
                >
                    <Input.Password
                        type='password'
                        placeholder='Пароль'
                        data-test-id='change-password'
                    />
                </Form.Item>

                <Form.Item
                    name={AuthFieldNames.confirmPassword}
                    dependencies={[AuthFieldNames.password]}
                    rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>

                <Form.Item className={styles.formItemButton}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block={true}
                        className={styles.submitButton}
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </CustomSpace>
    );
};
