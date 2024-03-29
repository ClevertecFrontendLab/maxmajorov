import { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { EMAIL } from '@constants/general';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import { useReturnToken } from '@hooks/use-return-token';
import AttentionIcon from '@public/attention_icon.svg?react';
import ErrorIcon from '@public/error_icon.svg?react';
import { useConfirmEmailMutation } from '@redux/serviсes/auth';
import { Paths } from '@routes/paths';
import { CustomSpace } from '@shared/components/custom-space';
import classNames from 'classnames';

import styles from './confirm-email-page.module.css';

const attentionIcon = <AttentionIcon />;
const errorIcon = <ErrorIcon />;

export const ConfirmEmailPage = () => {
    const navigate = useNavigate();
    const { from, location } = useLastPartUrl();
    const [value, setValue] = useState('');

    const isCameFromAuth = from?.pathname === Paths.LOGIN;

    const token = useReturnToken();
    const email = localStorage.getItem(EMAIL);
    const [confirmEmail, { isError: isErrorConfirmEmail, isSuccess: isSuccessConfirmEmail }] =
        useConfirmEmailMutation();

    const onChangeHandler = (string: string) => {
        setValue(string);
    };

    const onSendCodeHandler = useCallback(
        (code: string) => {
            if (email) {
                confirmEmail({ email, code });
            }
        },
        [confirmEmail, email],
    );

    const icon = isErrorConfirmEmail ? errorIcon : attentionIcon;
    const title = isErrorConfirmEmail
        ? 'Неверный код. Введите код для восстановления аккауанта'
        : 'Введите код для восстановления аккауанта';

    useEffect(() => {
        if (isSuccessConfirmEmail) {
            navigate(`${Paths.LOGIN}/${Paths.CHANGE_PASSWORD}`, { state: { from: location } });
        }
        if (isErrorConfirmEmail) {
            setValue('');
        }
    }, [isErrorConfirmEmail, isSuccessConfirmEmail, location, navigate]);

    if (token) {
        return <Navigate to={from || Paths.MAIN} state={{ from: location }} />;
    }

    if (!isCameFromAuth) {
        return <Navigate to={from || Paths.AUTH} state={{ from: location }} />;
    }

    return (
        <CustomSpace
            size={24}
            direction='vertical'
            align='center'
            className={styles.confirmEmailPage}
        >
            {icon}
            <CustomSpace
                direction='vertical'
                align='center'
                size={0}
                className={styles.descriptionContainer}
            >
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>
                    Мы отправили вам на e-mail <span className={styles.email}>{email}</span>{' '}
                    шестизначный код. Введите его в поле ниже.
                </span>
            </CustomSpace>
            <VerificationInput
                value={value}
                classNames={{
                    container: styles.verificationContainer,
                    character: classNames(styles.character, {
                        [styles.errorCharacter]: isErrorConfirmEmail,
                    }),
                }}
                onChange={onChangeHandler}
                onComplete={onSendCodeHandler}
                placeholder=''
                validChars='0-9'
                inputProps={
                    {
                        inputMode: 'numeric',
                        'data-test-id': 'verification-input',
                    } as ComponentPropsWithRef<'input'> & {
                        'data-test-id': string;
                    }
                }
            />
            <span className={styles.description}>Не пришло письмо? Проверьте папку Спам.</span>
        </CustomSpace>
    );
};
