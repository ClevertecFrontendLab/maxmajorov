import { ProfileFieldNames } from '@common-types/credentials';
import { Form, Input } from 'antd';

import { DataTestIdProp } from '../validation-form';

export const ValidationFormName = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item name={ProfileFieldNames.name}>
        <Input type='text' placeholder='Имя' data-test-id={dataTestId} />
    </Form.Item>
);
