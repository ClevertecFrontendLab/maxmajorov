import { Status } from '@constants/status';
import { ApiEndpoints } from '@redux/constants/api';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { setAppLoader } from '@redux/modules/app';
import {
    removeInvite,
    removeJointTraining,
    setAcceptedUsersList,
    setInviteList,
    setJointTrainingStatus,
    setUserJointTraining,
} from '@redux/modules/invite';
import { apiSlice } from '@redux/serviсes/index';
import {
    Invite,
    SendAnswerInviteRequest,
    SendInviteRequest,
    UserJointTrainigList,
} from '@redux/types/invite';
import { Nullable } from 'src/types/nullable';

export const inviteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserJointTrainingList: builder.query<
            UserJointTrainigList[],
            { trainingType?: string; status?: string | null }
        >({
            query: (body) => {
                const params: Record<string, string | undefined> = {};

                if (body.trainingType) {
                    params.trainingType = body.trainingType;
                }

                if (body.status !== null) {
                    params.status = body.status;
                }

                return {
                    url: ApiEndpoints.USER_JOINT_TRAINING_LIST,
                    method: 'GET',
                    name: EndpointNames.GET_USER_JOINT_TRAINING_LIST,
                    params,
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setUserJointTraining(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        getAcceptedUsersList: builder.query<UserJointTrainigList[], void>({
            query: () => ({
                url: ApiEndpoints.TRAINING_PALS_LIST,
                method: 'GET',
                name: EndpointNames.GET_TRAINING_PALS_LIST,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setAcceptedUsersList(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
        removeJointTraining: builder.mutation<void, { inviteId: Nullable<string> }>({
            query: ({ inviteId }) => ({
                url: `${ApiEndpoints.INVITE}/${inviteId}`,
                method: 'DELETE',
                name: EndpointNames.REMOVE_JOINT_TRAINING,
            }),
            async onQueryStarted(inviteId, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));

                    dispatch(removeJointTraining(inviteId));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
        getInviteList: builder.query<Invite[], void>({
            query: () => ({
                url: ApiEndpoints.INVITE,
                method: 'GET',
                name: EndpointNames.GET_INVITE_LIST,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setInviteList(data));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
        sendInvite: builder.mutation<Invite, SendInviteRequest>({
            query: (body) => ({
                url: ApiEndpoints.INVITE,
                method: 'POST',
                name: EndpointNames.SEND_INVITE,
                body,
            }),

            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setJointTrainingStatus({ id: body.to, status: Status.PENDING }));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
        sendAnswerInvite: builder.mutation<Invite, SendAnswerInviteRequest>({
            query: (body) => ({
                url: ApiEndpoints.INVITE,
                method: 'PUT',
                name: EndpointNames.ANSWER_ON_INVITE,
                body,
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(removeInvite(body.id));
                    dispatch(setJointTrainingStatus({ id: body.id, status: body.status }));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
    }),
});
export const {
    useLazyGetUserJointTrainingListQuery,
    useGetAcceptedUsersListQuery,
    useGetInviteListQuery,
    useSendInviteMutation,
    useSendAnswerInviteMutation,
    useRemoveJointTrainingMutation,
} = inviteApiSlice;
