import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './services-base-query';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});
