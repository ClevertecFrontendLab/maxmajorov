import { CalendarTwoTone } from '@ant-design/icons';
import { ProfileFieldNames } from '@common-types/credentials';
import { DatePicker, Form } from 'antd';

import { DataTestIdProp } from '../validation-form';

import styles from './validation-form-birthday.module.css';

export const ValidationFormBirthday = ({ dataTestId }: DataTestIdProp) => {
    const iconColor = 'rgba(0, 0, 0, 0.25)';

    return (
        <Form.Item name={ProfileFieldNames.birthday}>
            <DatePicker
                format='DD.MM.YYYY'
                className={styles.datepicker}
                placeholder='Дата рождения'
                suffixIcon={<CalendarTwoTone twoToneColor={[iconColor, iconColor]} />}
                data-test-id={dataTestId}
            />
        </Form.Item>
    );
};
