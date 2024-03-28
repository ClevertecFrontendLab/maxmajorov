import { AuthFieldNames } from '@common-types/credentials';
import { VALIDATION_FIELD_EMAIL } from '@pages/login-page/constants/common';
import { Form, Input } from 'antd';

import { DataTestIdProp } from '../validation-form';

export const ValidationFormEmail = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item name={AuthFieldNames.email} rules={VALIDATION_FIELD_EMAIL}>
        <Input addonBefore='e-mail:' type='email' data-test-id={dataTestId} />
    </Form.Item>
);
