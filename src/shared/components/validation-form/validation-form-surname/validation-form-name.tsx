import { ProfileFieldNames } from '@common-types/credentials';
import { Form, Input } from 'antd';

import { DataTestIdProp } from '../validation-form';

export const ValidationFormSurname = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item name={ProfileFieldNames.surname}>
        <Input type='text' placeholder='Фамилия' data-test-id={dataTestId} />
    </Form.Item>
);
