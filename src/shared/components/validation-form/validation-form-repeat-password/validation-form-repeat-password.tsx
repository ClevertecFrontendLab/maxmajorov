import { useContext } from 'react';
import { AuthFieldNames } from '@common-types/credentials';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { Form, Input } from 'antd';

import { DataTestIdProp, ValidationFormContext } from '../validation-form';

export const ValidationFormRepeatPassword = ({ dataTestId }: DataTestIdProp) => {
    const { form } = useContext(ValidationFormContext);

    return (
        <Form.Item
            name={AuthFieldNames.confirmPassword}
            dependencies={[AuthFieldNames.password]}
            rules={[
                confirmPasswordValidator,
                { required: form?.getFieldValue(AuthFieldNames.password), message: '' },
            ]}
        >
            <Input.Password placeholder='Повторите пароль' data-test-id={dataTestId} />
        </Form.Item>
    );
};
