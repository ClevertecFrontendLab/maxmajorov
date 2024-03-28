import { ReactNode, useContext } from 'react';
import { Button, Form } from 'antd';

import { DataTestIdProp, ValidationFormContext } from '../validation-form';

export const ValidateFormSubmit = ({
    dataTestId,
    children,
}: DataTestIdProp & {
    children: ReactNode | string;
}) => {
    const { isTouched } = useContext(ValidationFormContext);

    return (
        <Form.Item>
            <Button
                type='primary'
                htmlType='submit'
                data-test-id={dataTestId}
                disabled={!isTouched}
            >
                {children}
            </Button>
        </Form.Item>
    );
};
