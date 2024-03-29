import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { ACCESS_TOKEN_NAME, EMAIL } from '@constants/general';
import { HttpStatus } from '@constants/http-status';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import { EMAIL_NO_EXIST } from '@pages/login-page/constants/common';
import { NamePages } from '@pages/login-page/hooks/constants/name-pages';
import {
    credentialSelector,
    errorSelector,
    setAccessToken,
    setAppCredential,
    setAppIsError,
} from '@redux/modules/app';
import {
    useChangePasswordMutation,
    useCheckEmailMutation,
    useLoginMutation,
    useRegistrationMutation,
} from '@redux/serviсes/auth';
import { ApiErrorResponse } from '@redux/types/api';
import { Paths } from '@routes/paths';
import { Form } from 'antd';

export const useAuthForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lastPartUrl, from, location } = useLastPartUrl();
    const isRequestPendingRef = useRef(false);
    const credentialsFromState = useAppSelector(credentialSelector);
    const { remember, email, password, confirmPassword } = credentialsFromState;
    const isError = useAppSelector(errorSelector);

    const [login, { isError: isErrorLogin, isSuccess: isSuccessLogin, data: response }] =
        useLoginMutation();
    const [
        registration,
        {
            isError: isErrorRegistration,
            isSuccess: isSuccessRegistration,
            error: errorRegistration,
        },
    ] = useRegistrationMutation();
    const [changePassword, { isError: isErrorChangePassword, isSuccess: isSuccessChangePassword }] =
        useChangePasswordMutation();
    const [
        checkEmail,
        { isError: isErrorCheckEmail, isSuccess: isSuccessCheckEmail, error: errorCheckEmail },
    ] = useCheckEmailMutation();

    const isRegistrationPage = lastPartUrl === NamePages.REGISTRATION;
    const isChangePasswordPage = lastPartUrl === NamePages.CHANGE_PASSWORD;
    const isLoginPage = lastPartUrl === NamePages.LOGIN;

    const { status, data } = (errorCheckEmail as ApiErrorResponse) || {};

    const isEmailNoExist = status === HttpStatus.NOT_FOUND && data?.message === EMAIL_NO_EXIST;

    const onCheckEmail = useCallback(() => {
        const emailField = form.getFieldValue(AuthFieldNames.email);

        if (emailField) {
            checkEmail({ email: emailField, message: '' });
            localStorage.setItem(EMAIL, emailField);
        }
    }, [checkEmail, form]);

    const onFinish = useCallback(
        (credentials: CredentialsType) => {
            const { email, password, confirmPassword } = { ...credentials };

            if (isRegistrationPage) {
                registration({ email, password });
                dispatch(setAppCredential(credentials));
            }
            if (isChangePasswordPage) {
                changePassword({ password, confirmPassword });
                dispatch(setAppCredential(credentials));
            }
            if (isLoginPage) {
                login({ email, password });
                dispatch(setAppCredential(credentials));
            }
        },
        [
            changePassword,
            dispatch,
            isChangePasswordPage,
            isLoginPage,
            isRegistrationPage,
            login,
            registration,
        ],
    );

    // для повторного запроса, после ошибки первичного
    useEffect(() => {
        const cameFromLocation =
            from?.pathname === `${Paths.RESULT}/${Paths.ERROR}` ||
            from?.pathname === `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`;

        const cameFromLocationForCheckEmail =
            from?.pathname === `${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`;

        if (cameFromLocation && isError && !isRequestPendingRef.current) {
            onFinish({ email, password, confirmPassword, remember });
            isRequestPendingRef.current = true;
        }

        if (cameFromLocationForCheckEmail && isError && !isRequestPendingRef.current) {
            const email = localStorage.getItem(EMAIL);

            form.setFieldValue(AuthFieldNames.email, email);
            onCheckEmail();
            isRequestPendingRef.current = true;
        }
    }, [
        confirmPassword,
        credentialsFromState,
        email,
        form,
        from?.pathname,
        isError,
        location.state,
        onCheckEmail,
        onFinish,
        password,
        remember,
    ]);

    // переходы в компоненту result
    useEffect(() => {
        switch (true) {
            case isSuccessRegistration:
                dispatch(setAppIsError(false));
                navigate(`${Paths.RESULT}/${Paths.SUCCESS}`, { state: { from: location } });
                localStorage.setItem(EMAIL, email);
                break;

            case isErrorRegistration &&
                (errorRegistration as ApiErrorResponse)?.status === HttpStatus.CONFLICT:
                navigate(`${Paths.RESULT}/${Paths.ERROR_409}`, { state: { from: location } });
                break;

            case isErrorRegistration &&
                (errorRegistration as ApiErrorResponse)?.status !== HttpStatus.CONFLICT:
                dispatch(setAppIsError(true));
                navigate(`${Paths.RESULT}/${Paths.ERROR}`, { state: { from: location } });
                break;

            case isErrorLogin:
                navigate(`${Paths.RESULT}/${Paths.ERROR_LOGIN}`, { state: { from: location } });
                break;

            case isSuccessLogin:
                if (remember) {
                    localStorage.setItem(ACCESS_TOKEN_NAME, response?.accessToken ?? '');
                }
                dispatch(setAccessToken(response?.accessToken ?? ''));
                navigate(Paths.AUTH);
                break;

            case isErrorChangePassword:
                dispatch(setAppIsError(true));
                navigate(`${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`, {
                    state: { from: location },
                });
                break;

            case isSuccessChangePassword:
                dispatch(setAppIsError(false));
                navigate(`${Paths.RESULT}/${Paths.SUCCESS_CHANGE_PASSWORD}`, {
                    state: { from: location },
                });
                break;

            case isSuccessCheckEmail:
                dispatch(setAppIsError(false));
                navigate(Paths.CONFIRM_EMAIL, { state: { from: location } });
                break;

            case isErrorCheckEmail && isEmailNoExist:
                navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL_NO_EXIST}`, {
                    state: { from: location },
                });
                break;

            case isErrorCheckEmail:
                dispatch(setAppIsError(true));
                navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`, {
                    state: { from: location },
                });
                break;

            default:
                break;
        }
    }, [
        errorRegistration,
        remember,
        dispatch,
        isErrorLogin,
        isErrorRegistration,
        isErrorChangePassword,
        isSuccessLogin,
        isSuccessRegistration,
        location,
        navigate,
        response?.accessToken,
        isSuccessChangePassword,
        email,
        isSuccessCheckEmail,
        isErrorCheckEmail,
        errorCheckEmail,
        isEmailNoExist,
    ]);

    return {
        onFinish,
        form,
        location,
        from,
        isRegistrationPage,
        onCheckEmail,
    };
};
