import React from 'react';
import { SelectDouble } from '@components/dropdown-double';
import { ChangeType } from '@constants/card-modal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setTrainingData, trainingsSelector } from '@redux/modules/training';
import { getKeyByPeriod, getPeriodByItem, getPeriodItems } from '@utils/find-period-options';
import { FORMAT_Y_M_D, formatDate, isOldDate } from '@utils/format-date';
import { Checkbox, Col, DatePicker, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment, { Moment } from 'moment';

import { DATA_TEST_ID } from '../../../../../constans/data-test-id';

export const Frequency: React.FC = () => {
    const {
        typeEdit,
        userTraining,
        defaultTrainings,
        createdTraining: { name, date, parameters },
    } = useAppSelector(trainingsSelector);

    const dispatch = useAppDispatch();

    const frequencyHandler = (e: CheckboxChangeEvent) => {
        dispatch(
            setTrainingData({
                parameters: {
                    period: 0,
                    repeat: e.target.checked,
                    jointTraining: parameters?.jointTraining as boolean,
                    participants: [],
                },
            }),
        );
    };

    const selectFrequencyHandler = (item: string) => {
        dispatch(
            setTrainingData({
                parameters: {
                    period: getPeriodByItem(item),
                    repeat: parameters?.repeat as boolean,
                    jointTraining: parameters?.jointTraining as boolean,
                    participants: [],
                },
            }),
        );
    };

    const selectTrainigDateHandler = (pickerDate: Moment) => {
        dispatch(setTrainingData({ date: formatDate(pickerDate, FORMAT_Y_M_D) }));
    };

    const selectTrainingTypeHandler = (value: string) => {
        dispatch(setTrainingData({ name: value }));
    };

    const dateCellRender = (pickerDate: Moment) => {
        if (pickerDate === undefined) {
            return 'Select date';
        }

        const formattedDate = pickerDate.format('YYYY-MM-DD');

        if (Object.keys(userTraining).includes(formattedDate)) {
            return <div style={{ backgroundColor: '#F0F5FF' }}>{pickerDate.date()}</div>;
        }

        return pickerDate.date();
    };

    const disabledDateHandler = (pickerDate: Moment) => {
        if (typeEdit === ChangeType.JOINT_TRAINING || typeEdit === ChangeType.ADD_NEW) {
            return isOldDate(pickerDate);
        }

        return false;
    };

    return (
        <div>
            {typeEdit !== ChangeType.JOINT_TRAINING && (
                <SelectDouble
                    dataTestId={DATA_TEST_ID.modalCreateExerciseSelect}
                    defaultItem={name}
                    onSelectItem={selectTrainingTypeHandler}
                    defaultsItems={defaultTrainings}
                    screen='training'
                />
            )}
            <Row gutter={16} style={{ marginTop: '24px' }}>
                <Col span={12}>
                    <DatePicker
                        data-test-id={DATA_TEST_ID.modalDrawerRightDatePicker}
                        size='small'
                        disabledDate={disabledDateHandler}
                        dateRender={dateCellRender}
                        defaultValue={date ? moment(date) : undefined}
                        // eslint-disable-next-line
                        // @ts-ignore
                        onChange={selectTrainigDateHandler}
                    />
                </Col>
                <Col span={12}>
                    <Checkbox
                        checked={parameters?.repeat}
                        data-test-id={DATA_TEST_ID.modalDrawerRightCheckboxPeriod}
                        onChange={frequencyHandler}
                    >
                        С периодичностью
                    </Checkbox>
                </Col>
                <Col span={12} style={{ marginTop: '8px' }}>
                    {parameters?.repeat && (
                        <SelectDouble
                            dataTestId={DATA_TEST_ID.modalDrawerRightSelectPeriod}
                            defaultItem={getKeyByPeriod(parameters?.period) || 'Периодичность'}
                            onSelectItem={selectFrequencyHandler}
                            defaultsItems={getPeriodItems()}
                            size='small'
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};
