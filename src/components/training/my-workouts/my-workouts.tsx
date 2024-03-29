import React from 'react';
import { CardModal } from '@components/calendar-training/card-modal/card-modal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { setStateLeftMenu } from '@redux/modules/app.ts';
import { addDefaultTraining, trainingsSelector } from '@redux/modules/training.ts';
import { Button, Typography } from 'antd';

import { TrainingList } from './elems/training-list';

import styles from './my-workouts.module.css';

export const MyWorkouts = () => {
    const {
        createdTraining: { exercises },
        userTraining,
    } = useAppSelector(trainingsSelector);

    const dispatch = useAppDispatch();

    const openRightMenuHandler = () => {
        dispatch(setStateLeftMenu());
        if (!exercises.length) {
            dispatch(addDefaultTraining());
        }
    };

    return (
        <React.Fragment>
            {Object.keys(userTraining).length ? (
                <TrainingList />
            ) : (
                <div className={styles.workoutsEmpty}>
                    <Typography.Text>У вас еще нет созданных тренировок</Typography.Text>
                    <Button
                        type='primary'
                        size='large'
                        onClick={openRightMenuHandler}
                        style={{ marginTop: '75px' }}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}

            <CardModal screen='training' onClose={() => {}} />
        </React.Fragment>
    );
};
