import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { clearStateOnLogout } from '@redux/modules/app';
import { clearProfileStateOnLogout } from '@redux/modules/profile';
import { apiSlice } from '@redux/serviсes';

export const useLogout = () => {
    const dispatch = useDispatch();

    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        dispatch(clearStateOnLogout());
        dispatch(clearProfileStateOnLogout());
        dispatch(apiSlice.util.resetApiState());
    }, [dispatch]);

    return logout;
};
