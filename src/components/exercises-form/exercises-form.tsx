import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Input, InputNumber } from 'antd';

import { DATA_TEST_ID } from '../../constans/data-test-id';
import { Nullable } from '../../types/nullable.ts';

import styles from './exercises-form.module.css';

type ExercisesFormProps = {
    index: number;
    indexes: number[];
    weight: number;
    approaches: number;
    name: string;
    replays: number;
    isCheck: boolean;
    onChangeName: (value: string, index: number) => void;
    onChangeReplays: (value: Nullable<number>, index: number) => void;
    onChangeWeight: (value: Nullable<number>, index: number) => void;
    onChangeApproaches: (value: Nullable<number>, index: number) => void;
    onCheckedElement: (index: number) => void;
};

export const ExercisesForm: FC<ExercisesFormProps> = ({
    onChangeReplays,
    onChangeApproaches,
    onChangeWeight,
    onChangeName,
    onCheckedElement,
    weight,
    replays,
    name,
    approaches,
    index,
    indexes,
    isCheck,
}) => {
    const isChecked = indexes.includes(index);

    const onChangeNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeName(event.currentTarget.value, index);
    };

    const onChangeApproachesHandle = (value: Nullable<number>) => {
        onChangeApproaches(value, index);
    };

    const onChangeReplaysHandle = (value: Nullable<number>) => {
        onChangeReplays(value, index);
    };

    const onChangeWeightHandle = (value: Nullable<number>) => {
        onChangeWeight(value, index);
    };

    return (
        <React.Fragment>
            <Input
                data-test-id={`${DATA_TEST_ID.modalDrawerRightInputExercise}${index}`}
                value={name}
                className={styles.input}
                onChange={onChangeNameHandle}
                placeholder='Упражнениe'
                addonAfter={
                    isCheck && (
                        <Checkbox
                            data-test-id={`${DATA_TEST_ID.modalDrawerRightCheckboxExercise}${index}`}
                            checked={isChecked}
                            onChange={() => onCheckedElement(index)}
                        />
                    )
                }
            />
            <div className={styles.wrapperBlock}>
                <div className={styles.label}>Подходы</div>
                <div className={styles.wrapperItem}>
                    <div className={styles.simpleLabel}>Вес, кг</div>
                    <div className={styles.simpleLabel}>Количество</div>
                </div>
            </div>
            <div className={styles.wrapperBlock}>
                <InputNumber
                    data-test-id={`${DATA_TEST_ID.modalDrawerRightInputApproach}${index}`}
                    value={replays}
                    className={styles.inputNumber}
                    addonBefore='+'
                    min={1}
                    onChange={onChangeReplaysHandle}
                />
                <div className={styles.wrapperItem}>
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputWeight}${index}`}
                        value={weight}
                        className={styles.simpleInput}
                        min={0}
                        onChange={onChangeWeightHandle}
                    />
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputQuantity}${index}`}
                        value={approaches}
                        className={styles.simpleInput}
                        min={0}
                        onChange={onChangeApproachesHandle}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
