/* eslint-disable react/no-array-index-key */
import { FC, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed.tsx';
import { TrainingDataCall } from '@components/calendar-training/card-modal/types/card-modal.ts';
import { SelectDouble } from '@components/dropdown-double';
import { EmptyElement } from '@components/empty';
import { Exercises, UserTraining } from '@redux/types/training.ts';
import { isOldDate } from '@utils/format-date.ts';
import { isExercisesNotEmpty } from '@utils/is-exercises-not-empty.ts';
import { Button, Card } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import { Moment } from 'moment';

import { CardModalBody } from '../../../../constans/card-modal.ts';
import { DATA_TEST_ID } from '../../../../constans/data-test-id';

import styles from './card-exercises.module.css';

type CardExercisesProps = {
    textButtonCancel: string;
    defaultsTrainings: string[];
    selectedTraining: string;
    isLoading: boolean;
    disabledSave: boolean;
    trainings: UserTraining[];
    exercises: Exercises[];
    date: Moment;
    openFlag: CardModalBody;
    onAddButton: (date: Moment) => void;
    onSaveButton: () => void;
    onNextOpen: (data: TrainingDataCall) => void;
    onSelectedTraining: (value: string, data: string | Moment) => void;
};

export const CardExercises: FC<CardExercisesProps> = ({
    defaultsTrainings,
    selectedTraining,
    trainings,
    exercises,
    onAddButton,
    onSaveButton,
    date,
    onNextOpen,
    onSelectedTraining,
    openFlag,
    disabledSave,
    isLoading,
    textButtonCancel,
}) => {
    const [body, setBody] = useState(<EmptyElement />);
    const selectedTrainings = isOldDate(date)
        ? trainings.filter(({ isImplementation }) => !isImplementation).map(({ name }) => name)
        : trainings.map(({ name }) => name);
    const isDisabled = !defaultsTrainings.includes(selectedTraining);

    const onNextOpenHandel = () => {
        onNextOpen({ openFlag, date });
    };

    const onSelectedTrainingHandel = (value: string) => {
        onSelectedTraining(value, date);
    };

    useEffect(() => {
        if (exercises && exercises.length && isExercisesNotEmpty(exercises)) {
            setBody(
                <div className={styles.cardBody}>
                    {exercises?.map(({ name }, index) => (
                        <BadgeChanged
                            index={index}
                            isStatus={false}
                            isEdit={true}
                            text={name}
                            date={date}
                            onChange={() => onAddButton(date)}
                        />
                    ))}
                </div>,
            );
        } else {
            setBody(<EmptyElement />);
        }
    }, [trainings, exercises]);

    return (
        <Card
            data-test-id={DATA_TEST_ID.modalCreateExercise}
            className={styles.cardModal}
            actions={[
                <ButtonGroup className={styles.buttonGroup}>
                    <Button
                        size='middle'
                        type='ghost'
                        onClick={() => onAddButton(date)}
                        disabled={isDisabled || isLoading}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        size='middle'
                        type='link'
                        loading={isLoading}
                        className={styles.buttonAction}
                        onClick={onSaveButton}
                        disabled={disabledSave}
                    >
                        {textButtonCancel}
                    </Button>
                </ButtonGroup>,
            ]}
        >
            <div className={styles.cardWrapper}>
                <div className={styles.titleWrapper}>
                    <Button
                        data-test-id={DATA_TEST_ID.modalExerciseTrainingButtonClose}
                        type='text'
                        size='small'
                        icon={<ArrowLeftOutlined />}
                        onClick={onNextOpenHandel}
                    />
                    <SelectDouble
                        isDouble={!isOldDate(date)}
                        defaultItem={selectedTraining}
                        onSelectItem={onSelectedTrainingHandel}
                        selectedItems={selectedTrainings}
                        defaultsItems={defaultsTrainings}
                        dataTestId={DATA_TEST_ID.modalCreateExerciseSelect}

                    />
                </div>
                {body}
            </div>
        </Card>
    );
};
