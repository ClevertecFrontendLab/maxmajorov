import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Badge, Button, Typography } from 'antd';
import { Moment } from 'moment';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import styles from './badge-changed.module.css';

const defaultColor = ['pink', 'yellow', 'green', 'blue', 'purple', 'gold'];

function getColorStatus() {
    const randomIndex = Math.floor(Math.random() * defaultColor.length);

    return defaultColor[randomIndex];
}

type BadgeChangedProps = {
    isEdit: boolean;
    text: string;
    date: Moment;
    index?: number;
    disabled?: boolean;
    isStatus?: boolean;
    onChange?: (value: Moment, text: string) => void;
};

export const BadgeChanged: FC<BadgeChangedProps> = ({
    isEdit = true,
    isStatus,
    onChange,
    text,
    date,
    disabled,
    index,
}) =>
    text ? (
        <div className={isEdit ? styles.wrapper : styles.wrapperNoEdit}>
            {isStatus ? (
                <Badge
                    className={`${styles.badge}`}
                    style={{ color: disabled ? '#BFBFBF' : '' }}
                    color={getColorStatus()}
                    size='small'
                    text={text}
                />
            ) : (
                <Typography.Text type='secondary' className={styles.badge}>
                    {text}
                </Typography.Text>
            )}

            {isEdit && (
                <Button
                    data-test-id={`${DATA_TEST_ID.modalUpdateTrainingEditButton}${index}`}
                    type='link'
                    onClick={() => onChange && onChange(date, text)}
                    className={styles.button}
                    disabled={disabled}
                >
                    <EditOutlined />
                </Button>
            )}
        </div>
    ) : null;
