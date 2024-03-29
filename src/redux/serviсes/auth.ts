import { ApiEndpoints } from '@redux/constants/api';
import { ApiGroupNames } from '@redux/constants/api-group-names';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { setAppLoader } from '@redux/modules/app';
import { apiSlice } from '@redux/serviсes/index';
import {
    ChangePasswordRequestType,
    ChangePasswordResponseType,
    CheckEmailRequestType,
    CheckEmailResponseType,
    ConfirmEmailRequestType,
    ConfirmEmailResponseType,
    LoginRequestType,
    LoginResponseType,
} from '@redux/types/auth';

export const authExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseType, LoginRequestType>({
            query: ({ email, password }) => ({
                url: ApiEndpoints.LOGIN,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.LOGIN,
                body: {
                    email,
                    password,
                },
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        registration: builder.mutation<void, LoginRequestType>({
            query: ({ email, password }) => ({
                url: ApiEndpoints.REGISTRATION,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.REGISTRATION,
                body: {
                    email,
                    password,
                },
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        checkEmail: builder.mutation<CheckEmailResponseType, CheckEmailRequestType>({
            query: (obj) => ({
                url: ApiEndpoints.CHECK_EMAIL,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.CHECK_EMAIL,
                body: obj,
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        confirmEmail: builder.mutation<ConfirmEmailResponseType, ConfirmEmailRequestType>({
            query: (obj) => ({
                url: ApiEndpoints.CONFIRM_EMAIL,
                method: 'POST',
                credentials: 'include',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.CONFIRM_EMAIL,
                body: obj,
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        changePassword: builder.mutation<ChangePasswordResponseType, ChangePasswordRequestType>({
            query: (obj) => ({
                url: ApiEndpoints.CHANGE_PASSWORD,
                method: 'POST',
                credentials: 'include',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.CHANGE_PASSWORD,
                body: obj,
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
    }),
});
export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authExtendedApiSlice;
