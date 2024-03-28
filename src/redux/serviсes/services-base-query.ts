import { API_URL } from '@constants/general';
import { ApplicationState } from '@redux/configure-store';
import { accessTokenSelector } from '@redux/modules/app';
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const mainBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as ApplicationState;
        const accessToken = accessTokenSelector(state);

        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
});

export const authBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions: { auth?: boolean },
) => {
    if (!extraOptions || !extraOptions.auth) {
        return mainBaseQuery(args, api, extraOptions);
    }

    return authBaseQuery(args, api, extraOptions);
};
