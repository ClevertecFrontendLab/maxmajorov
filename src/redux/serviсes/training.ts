import { ApiEndpoints } from '@redux/constants/api';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { Tags } from '@redux/constants/tags';
import { setAppLoader } from '@redux/modules/app';
import {
    resetStateCreating,
    setDefaultTraining,
    setStateCardModal,
    setUserTrainings,
} from '@redux/modules/training.ts';
import { apiSlice } from '@redux/serviсes/index';
import { Training, UserTraining, UserTrainingTransform } from '@redux/types/training.ts';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date.ts';
import moment from 'moment';

import { CardModalBody } from '../../constans/card-modal.ts';

export const trainingApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.USER_TRAINING],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getTrainingList: builder.query<string[], void>({
                query: () => ({
                    url: ApiEndpoints.TRAINING_LIST,
                    method: 'GET',
                    name: EndpointNames.GET_TRAINING_LIST,
                }),

                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        const { data } = await queryFulfilled;

                        dispatch(setAppLoader(false));
                        dispatch(setDefaultTraining(data));
                    } catch {
                        dispatch(setAppLoader(false));
                    }
                },
                transformResponse: (response: Training[]) => response.map(({ name }) => name),
            }),

            getUserTraining: builder.query<UserTrainingTransform, void>({
                query: () => ({
                    url: ApiEndpoints.TRAINING,
                    method: 'GET',
                    name: EndpointNames.GET_USER_TRAINING,
                }),

                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        const { data } = await queryFulfilled;

                        dispatch(setAppLoader(false));
                        dispatch(setUserTrainings(data));
                    } catch {
                        dispatch(setAppLoader(false));
                    }
                },
                transformResponse: (response: Array<Omit<UserTraining, 'id'> & { _id: string }>) =>
                    response.reduce((acc: UserTrainingTransform, curr) => {
                        const key = formatDate(moment(curr.date), FORMAT_Y_M_D);

                        if (acc[key]?.length) {
                            // eslint-disable-next-line no-underscore-dangle
                            acc[key].push({ ...curr, id: curr._id });
                        } else {
                            // eslint-disable-next-line no-underscore-dangle
                            acc[key] = [{ ...curr, id: curr._id }];
                        }

                        return acc;
                    }, {}),

                providesTags: [Tags.USER_TRAINING],
            }),

            createTraining: builder.mutation<UserTraining, UserTraining>({
                query: (body) => ({
                    url: ApiEndpoints.TRAINING,
                    method: 'POST',
                    name: EndpointNames.CREATE_TRAINING,
                    body,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setStateCardModal(CardModalBody.TRAINING));
                        dispatch(setAppLoader(false));
                    } catch {
                        dispatch(resetStateCreating());
                        dispatch(setAppLoader(false));
                    }
                },

                invalidatesTags: (_, error) => (error ? [] : [Tags.USER_TRAINING]),
            }),

            updateTraining: builder.mutation<void, UserTraining>({
                query: (body) => ({
                    url: `${ApiEndpoints.TRAINING}/${body.id}`,
                    method: 'PUT',
                    name: EndpointNames.UPDATE_TRAINING,
                    body: {
                        name: body.name,
                        date: body.date,
                        isImplementation: body.isImplementation,
                        exercises: body.exercises,
                        parameters: body.parameters,
                    },
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setStateCardModal(CardModalBody.TRAINING));
                        dispatch(setAppLoader(false));
                    } catch {
                        dispatch(resetStateCreating());
                        dispatch(setAppLoader(false));
                    }
                },

                invalidatesTags: (_, error) => (error ? [] : [Tags.USER_TRAINING]),
            }),
        }),
    });
export const {
    useLazyGetTrainingListQuery,
    useLazyGetUserTrainingQuery,
    useGetUserTrainingQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} = trainingApiSlice;
