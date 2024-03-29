import React, { useState } from 'react';
import { DownOutlined, EditOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setStateLeftMenu } from '@redux/modules/app';
import { addDefaultTraining, setTrainingData, trainingsSelector } from '@redux/modules/training';
import { UserTraining } from '@redux/types/training';
import { getKeyByPeriod } from '@utils/find-period-options';
import { findUserTraining } from '@utils/find-user-training.ts';
import { FORMAT_Y_M_D, formatDate, isOldDate } from '@utils/format-date';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../../constans/data-test-id';
import { EditExercisesCard } from '../edit-exercises-card';

import styles from './training-list.module.css';

export const TrainingList: React.FC = () => {
    const [openEditCard, setOpenEditCard] = useState(false);
    const [date, setDate] = useState('');
    const [selectedTraining, setSelectedTraining] = useState<UserTraining>();

    const {
        defaultTrainings,
        userTraining,
        createdTraining: { exercises },
    } = useAppSelector(trainingsSelector);

    const dispatch = useAppDispatch();

    const allTrainings = Object.values(userTraining).flatMap((trainingsArray) => trainingsArray);

    const editTrainingHandler = (training: UserTraining) => {
        const date = formatDate(training.date, FORMAT_Y_M_D);

        dispatch(setStateLeftMenu());
        dispatch(setTrainingData({ name: training.name, date }));
        setDate(date);
        setSelectedTraining(training);

        dispatch(
            setTrainingData({
                ...findUserTraining(userTraining, date, training.name),
                date,
                name: training.name,
            }),
        );
    };

    const addNewTrainingHandler = () => {
        dispatch(setStateLeftMenu());
        if (!exercises.length) {
            dispatch(addDefaultTraining());
        }
    };

    const openCardExercisesHandler = (training: UserTraining) => {
        setOpenEditCard(true);
        setDate(formatDate(training.date, FORMAT_Y_M_D));
        setSelectedTraining(training);
    };

    const columns: ColumnsType<UserTraining> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_text, record) => (
                <div
                    title={formatDate(record.date, FORMAT_Y_M_D)}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <BadgeChanged
                        isStatus={true}
                        isEdit={false}
                        text={record.name}
                        date={moment(record.date)}
                    />

                    <Button
                        type='link'
                        onClick={() => openCardExercisesHandler(record)}
                        disabled={isOldDate(date)}
                    >
                        <DownOutlined />
                    </Button>
                    {openEditCard && record.id === selectedTraining?.id && (
                        <EditExercisesCard
                            selectedTraining={record}
                            onClose={() => setOpenEditCard(false)}
                            onEditExercises={editTrainingHandler}
                        />
                    )}
                </div>
            ),
        },
        {
            key: 'frequency',
            title: 'Периодичность',
            dataIndex: 'frequency',
            render: (_text, record) => <div>{getKeyByPeriod(record.parameters?.period)}</div>,
            sorter: (a, b) => {
                const per1 = a.parameters?.period ?? 0;
                const per2 = b.parameters?.period ?? 0;

                return per1 - per2;
            },
        },
        {
            key: 'action',
            title: '',
            dataIndex: 'action',
            width: 30,
            render: (_text, record, index) => (
                <Button
                    type='link'
                    disabled={record.isImplementation}
                    onClick={() => editTrainingHandler(record)}
                    data-test-id={`${DATA_TEST_ID.updateMyTrainingTableIcon}${index}`}
                >
                    {record.isImplementation ? (
                        <EditOutlined style={{ fontSize: '24px' }} />
                    ) : (
                        <EditTwoTone style={{ fontSize: '24px' }} />
                    )}
                </Button>
            ),
        },
    ];

    return (
        <div className={styles.trainingList}>
            <Table
                data-test-id={DATA_TEST_ID.myTrainingsTable}
                columns={columns}
                pagination={{ position: ['bottomLeft', 'bottomLeft']}}
                dataSource={allTrainings}
                size='small'
            />

            {!!defaultTrainings.length && (
                <div className={styles.addButton}>
                    <Button
                        data-test-id={DATA_TEST_ID.createNewTrainingButton}
                        type='primary'
                        size='large'
                        icon={<PlusOutlined />}
                        onClick={addNewTrainingHandler}
                    >
                        Новая тренировка
                    </Button>
                </div>
            )}
        </div>
    );
};
