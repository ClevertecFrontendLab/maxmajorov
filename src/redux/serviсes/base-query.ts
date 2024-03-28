import { API_URL } from '@constants/general';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
});
