import { ApiEndpoints } from '@redux/constants/api';
import { ApiGroupNames } from '@redux/constants/api-group-names';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { Tags } from '@redux/constants/tags';
import { setAppLoader } from '@redux/modules/app';
import { apiSlice } from '@redux/serviсes/index';
import { CreateFeedbackRequestType, GetFeedbackRequestType } from '@redux/types/feedback';

export const feedbackExtendedApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.FEEDBACKS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getFeedbacks: builder.query<GetFeedbackRequestType[], void>({
                query: () => ({
                    url: ApiEndpoints.REVIEW,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.REVIEW,
                    name: EndpointNames.GET_FEEDBACKS,
                }),

                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setAppLoader(false));
                    } catch {
                        dispatch(setAppLoader(false));
                    }
                },

                providesTags: [Tags.FEEDBACKS],
            }),

            createFeedback: builder.mutation<void, CreateFeedbackRequestType>({
                query: ({ rating, message }) => ({
                    url: ApiEndpoints.REVIEW,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.REVIEW,
                    name: EndpointNames.CREATE_FEEDBACK,
                    body: {
                        message,
                        rating,
                    },
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setAppLoader(false));
                    } catch {
                        dispatch(setAppLoader(false));
                    }
                },

                invalidatesTags: (_, error) => (error ? [] : [Tags.FEEDBACKS]),
            }),
        }),
    });
export const { useGetFeedbacksQuery, useCreateFeedbackMutation } = feedbackExtendedApiSlice;
