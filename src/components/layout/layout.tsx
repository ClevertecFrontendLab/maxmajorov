import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/modules/app';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

export const Layout = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const accessToken = new URLSearchParams(location.search).get('accessToken');

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
            dispatch(setAccessToken(accessToken));
        }
    }, [accessToken, dispatch]);

    return (
        <ErrorBoundary>
            <Outlet />
        </ErrorBoundary>
    );
};
