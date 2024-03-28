/* eslint-disable react/no-array-index-key */

import { FC, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed.tsx';
import { EmptyElement } from '@components/empty';
import { UserTraining } from '@redux/types/training.ts';
import { formatDate } from '@utils/format-date.ts';
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Moment } from 'moment';

import { CardModalBody } from '../../../../constans/card-modal.ts';
import { DATA_TEST_ID } from '../../../../constans/data-test-id';
import { TrainingDataCall } from '../types/card-modal.ts';

import styles from './card-training.module.css';

type CardTrainingProps = {
    disabledButton: boolean;
    isTraining: boolean;
    trainings: UserTraining[];
    date: Moment;
    openFlag: CardModalBody;
    onNextOpen: (data: TrainingDataCall) => void;
    onClose: () => void;
};

export const CardTraining: FC<CardTrainingProps> = ({
    isTraining = false,
    trainings,
    date,
    onNextOpen,
    openFlag,
    onClose,
    disabledButton,
}) => {
    const [body, setBody] = useState(<EmptyElement />);

    const onNextOpenHandel = (value: Moment, name?: string) => {
        onNextOpen({ date: value, openFlag, name });
    };

    useEffect(() => {
        if (isTraining) {
            setBody(
                <div className={styles.cardBody}>
                    {trainings?.map(({ name, date, isImplementation, id }, index) => (
                        <BadgeChanged
                            index={index}
                            disabled={isImplementation}
                            key={id}
                            isStatus={true}
                            isEdit={true}
                            text={name}
                            date={date as unknown as Moment}
                            onChange={onNextOpenHandel}
                        />
                    ))}
                </div>,
            );
        }
    }, [trainings]);

    return (
        <Card
            data-test-id={DATA_TEST_ID.modalCreateTraining}
            className={styles.cardModal}
            actions={[
                <Button
                    disabled={disabledButton}
                    className={styles.actionButton}
                    size='large'
                    type='primary'
                    onClick={() => onNextOpenHandel(date)}
                >
                    Создать тренировку
                </Button>,
            ]}
        >
            <div className={styles.cardWrapper}>
                <div className={styles.titleWrapper}>
                    <Meta
                        className={styles.title}
                        title={`Тренировки на ${formatDate(date)}`}
                        description={!isTraining && 'Нет активных тренировок'}
                    />
                    <Button
                        data-test-id={DATA_TEST_ID.modalCreateTrainingButtonClose}
                        className={styles.button}
                        type='text'
                        size='small'
                        icon={<CloseOutlined />}
                        onClick={onClose}
                    />
                </div>
                {body}
            </div>
        </Card>
    );
};
