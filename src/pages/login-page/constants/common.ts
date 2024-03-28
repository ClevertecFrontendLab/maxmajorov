import { RuleObject } from 'antd/es/form';

export const VALIDATION_FIELD_EMAIL = [
    {
        type: 'email',
        message: '',
    },
    {
        required: true,
        message: '',
    },
] as RuleObject[];

export const VALIDATION_CONFIRM_PASSWORD = { message: '', required: true };
export const EMAIL_NO_EXIST = 'Email не найден';
