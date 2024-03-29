import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { accessTokenSelector, setAccessToken } from '@redux/modules/app';

export const useReturnToken = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(accessTokenSelector);

    useEffect(() => {
        const isTokenAlive = localStorage.getItem(ACCESS_TOKEN_NAME);

        if (isTokenAlive) {
            dispatch(setAccessToken(isTokenAlive));
        }
    }, [dispatch]);

    return token;
};
