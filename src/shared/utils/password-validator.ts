/* eslint-disable import/no-extraneous-dependencies */
import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'rc-field-form/lib/interface';

export const passwordValidator = (required = true) => ({
    validator(_: RuleObject, value: StoreValue) {
        const hasUpperCase = /[A-Z]/.test(String(value));
        const hasDigit = /\d/.test(String(value));
        const hasMinLength = String(value).length >= 8;

        if ((!required && !value) || (hasUpperCase && hasDigit && hasMinLength)) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
});
