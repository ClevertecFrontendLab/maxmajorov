import { HttpStatus } from '@constants/http-status';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ApiErrorData {
    message?: string;
    statusCode?: HttpStatus;
    error?: string;
}

export type ApiErrorResponse<T = FetchBaseQueryError | SerializedError> = {
    status: HttpStatus;
    data: ApiErrorData;
} & T;
