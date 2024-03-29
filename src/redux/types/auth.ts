import { CredentialsType } from '@common-types/credentials';

export type LoginResponseType = {
    accessToken: string;
};

export type LoginRequestType = Omit<CredentialsType, 'confirmPassword' | 'remember'>;

export type CheckEmailRequestType = {
    email: string;
    message: string;
};

export type CheckEmailResponseType = CheckEmailRequestType;

export type ConfirmEmailRequestType = {
    email: string;
    code: string;
};

export type ConfirmEmailResponseType = ConfirmEmailRequestType;

export type ChangePasswordRequestType = {
    password: string;
    confirmPassword: string;
};

export type ChangePasswordResponseType = {
    message: string;
};
