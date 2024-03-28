/* eslint-disable react/no-array-index-key */
import { FC, ReactNode, useEffect, useState } from 'react';
import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed.tsx';
import { DrawerRight } from '@components/drawer-right';
import { ExercisesForm } from '@components/exercises-form/exercises-form.tsx';
import { ModalNotification } from '@components/modal-notification';
import { PartnerInfo } from '@components/partner-info/partner-info.tsx';
import { Frequency } from '@components/training/my-workouts/elems/frequency/frequency.tsx';
import { CardModalBody, ChangeType } from '@constants/card-modal.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { leftMenuSelector, setStateLeftMenu } from '@redux/modules/app.ts';
import { selectedUserSelector } from '@redux/modules/invite.ts';
import {
    addDefaultTraining,
    addExercises,
    deleteExercises,
    resetStateCreating,
    resetTraining,
    setExercisesData,
    setExercisesNotEmpty,
    setStateCardModal,
    setTrainingData,
    trainingsSelector,
} from '@redux/modules/training.ts';
import { useSendInviteMutation } from '@redux/serviсes/invite.ts';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@redux/serviсes/training.ts';
import { UserTraining } from '@redux/types/training.ts';
import { findUserTraining } from '@utils/find-user-training.ts';
import { FORMAT_Y_M_D, formatDate, isOldDate } from '@utils/format-date.ts';
import { Alert, Button, Typography } from 'antd';
import classNames from 'classnames';
import moment, { Moment } from 'moment';

import { CardExercises } from './card-exercises/card-exercises.tsx';
import { TrainingDataCall } from './types/card-modal.ts';
import { CardTraining } from './card-training';

import styles from './card-modal.module.css';
import Nullable = Cypress.Nullable;

import { DATA_TEST_ID } from '../../../constans/data-test-id';

type CardModalWrapper = {
    offsetTop?: number;
    trainings?: UserTraining[];
    date?: Moment;
    onClose: () => void;
    isLeft?: boolean;
    screen?: string;
    selectedTraining?: UserTraining;
};

const titleDrawer: Record<ChangeType, string> = {
    [ChangeType.ADD_NEW]: 'Добавление упражнений',
    [ChangeType.EDIT_OLD]: 'Редактирование',
    [ChangeType.EDIT_FUTURE]: 'Редактирование',
    [ChangeType.JOINT_TRAINING]: 'Совместная тренировка',
};

const iconDrawer: Record<ChangeType, ReactNode> = {
    [ChangeType.ADD_NEW]: <PlusOutlined />,
    [ChangeType.EDIT_OLD]: <EditOutlined />,
    [ChangeType.EDIT_FUTURE]: <EditOutlined />,
    [ChangeType.JOINT_TRAINING]: <PlusOutlined />,
};

export const CardModal: FC<CardModalWrapper> = ({
    isLeft,
    onClose,
    trainings = [],
    date,
    offsetTop,
    screen,
    selectedTraining,
}) => {
    const [selectTraining, setSelectTraining] = useState(selectedTraining?.name ?? '');
    const [indexes, setIndexes] = useState<number[]>([]);
    const [openModalError, setOpenModalError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const dispatch = useAppDispatch();
    const openMenu = useAppSelector(leftMenuSelector);
    const {
        defaultTrainings,
        cardModalState,
        typeEdit,
        createdTraining: { exercises, date: dataCreated, name, id, parameters },
        userTraining,
    } = useAppSelector(trainingsSelector);

    const partner = useAppSelector(selectedUserSelector);

    const [
        createTraining,
        { isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isCreateSuccess },
    ] = useCreateTrainingMutation();
    const [
        updateTraining,
        { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isUpdateSuccess },
    ] = useUpdateTrainingMutation();
    const [sendInviteMutation, { isError: isInviteError }] = useSendInviteMutation();

    useEffect(() => {
        if (isErrorCreate || isErrorUpdate || isInviteError) {
            setOpenModalError(true);
        }
    }, [isErrorCreate, isErrorUpdate, isInviteError]);

    const onNextState = (data: TrainingDataCall) => {
        const dateFormat = formatDate(data.date, FORMAT_Y_M_D);

        dispatch(resetTraining());
        dispatch(setStateCardModal(data.openFlag));
        setSelectTraining(data?.name || '');
        dispatch(
            setTrainingData({
                ...findUserTraining(userTraining, dateFormat, data?.name),
                date: dateFormat,
                name: data?.name,
            }),
        );
    };

    const onOpenMenu = (date: string | Moment) => {
        dispatch(setStateLeftMenu());
        dispatch(setTrainingData({ date: formatDate(date, FORMAT_Y_M_D) }));
        if (!exercises.length) {
            dispatch(addDefaultTraining());
        }
    };

    const onCloseDrawer = () => {
        dispatch(setStateLeftMenu());
        dispatch(setExercisesNotEmpty(exercises.filter(({ name }) => Boolean(name))));
        if (screen === 'training') {
            dispatch(resetStateCreating());
        }
    };

    const onSelectedTraining = (value: string, date: string | Moment) => {
        const valueFormatDate = formatDate(date, FORMAT_Y_M_D);

        dispatch(
            setTrainingData({
                date: valueFormatDate,
                name: value,
                exercises:
                    userTraining[valueFormatDate]?.filter(({ name }) => name === value)?.[0]
                        ?.exercises || [],
            }),
        );

        setSelectTraining(value);
    };

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) {
            setIndexes(indexes.filter((element) => element !== index));

            return;
        }

        setIndexes([...indexes, index]);
    };

    const onChangeApproaches = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ approaches: value || 0, index }));
    };

    const onChangeName = (value: Nullable<string>, index: number) => {
        dispatch(setExercisesData({ name: value || '', index }));
    };

    const onChangeReplays = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ replays: value || 0, index }));
    };

    const onChangeWeight = (value: Nullable<number>, index: number) => {
        dispatch(setExercisesData({ weight: value || 0, index }));
    };

    const addExercisesDataHandle = () => {
        dispatch(addExercises());
    };

    const deleteExercisesDataHandle = () => {
        dispatch(deleteExercises(indexes));
        setIndexes([]);
    };

    const onClickButtonError = () => {
        setOpenModalError(false);
        dispatch(setStateCardModal());
    };

    const onSaveTraining = async () => {
        const trainingType = typeEdit === ChangeType.JOINT_TRAINING ? partner.trainingType : name;
        const body = {
            isImplementation: isOldDate(dataCreated),
            id,
            name: trainingType,
            exercises,
            date: `${dataCreated}T00:00:00.000Z`,
            parameters,
        };

        if (screen === 'training') {
            dispatch(setStateLeftMenu());
            setShowAlert(true);
        }

        if (typeEdit !== ChangeType.ADD_NEW && id) {
            updateTraining(body);
            setAlertMessage('Тренировка успешно обновлена');
            if (screen === 'training') {
                dispatch(resetStateCreating());
            }

            return;
        }

        try {
            const data = await createTraining(body).unwrap();

            setAlertMessage('Новая тренировка успешно добавлена');
            if (typeEdit === ChangeType.JOINT_TRAINING) {
                const trainingId: string = data.id || '';

                sendInviteMutation({ to: partner.id, trainingId });
            }

            if ((data && screen === 'training') || typeEdit === ChangeType.JOINT_TRAINING) {
                dispatch(resetStateCreating());
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [showAlert]);

    const ComponentToRender: Record<CardModalBody, ReactNode> = {
        [CardModalBody.TRAINING]: (
            <CardTraining
                disabledButton={defaultTrainings.length === trainings.length || isOldDate(date)}
                isTraining={Boolean(trainings.length)}
                trainings={trainings}
                date={date as Moment}
                onNextOpen={onNextState}
                openFlag={CardModalBody.EXERCISES}
                onClose={onClose}
            />
        ),
        [CardModalBody.EXERCISES]: (
            <CardExercises
                textButtonCancel={isOldDate(date) ? 'Сохранить изменения' : 'Сохранить'}
                isLoading={isLoadingCreate || isLoadingUpdate}
                defaultsTrainings={defaultTrainings}
                selectedTraining={selectTraining}
                trainings={trainings}
                exercises={selectedTraining?.exercises ?? exercises}
                onAddButton={onOpenMenu}
                onSaveButton={onSaveTraining}
                disabledSave={!exercises.length && typeEdit === ChangeType.ADD_NEW}
                date={date as Moment}
                onNextOpen={onNextState}
                openFlag={CardModalBody.TRAINING}
                onSelectedTraining={onSelectedTraining}
            />
        ),
    };

    const classWrapper = offsetTop
        ? styles.cardModalMobile
        : `${isLeft ? styles.cardModalLeft : styles.cardModalRight}`;

    return (
        <div
            style={{ top: offsetTop }}
            className={classNames(styles.cardModalWrapper, classWrapper)}
        >
            {!screen && ComponentToRender[cardModalState || CardModalBody.TRAINING]}

            <DrawerRight
                open={openMenu}
                onClose={onCloseDrawer}
                title={titleDrawer[typeEdit]}
                iconClose={iconDrawer[typeEdit]}
            >
                <div>
                    {typeEdit === ChangeType.JOINT_TRAINING && <PartnerInfo partner={partner} />}
                    {screen === 'training' ? (
                        <Frequency />
                    ) : (
                        <div className={styles.titleDate}>
                            <BadgeChanged
                                isStatus={true}
                                isEdit={false}
                                text={name}
                                date={moment(dataCreated)}
                            />
                            <Typography.Text type='secondary'>
                                {formatDate(dataCreated)}
                            </Typography.Text>
                        </div>
                    )}

                    {exercises.map(({ weight, approaches, name, replays }, index) => (
                        <ExercisesForm
                            key={index}
                            weight={weight}
                            approaches={approaches}
                            name={name}
                            replays={replays}
                            onChangeApproaches={onChangeApproaches}
                            onChangeName={onChangeName}
                            onChangeReplays={onChangeReplays}
                            onChangeWeight={onChangeWeight}
                            index={index}
                            indexes={indexes}
                            onCheckedElement={onSetIndex}
                            isCheck={typeEdit !== ChangeType.ADD_NEW}
                        />
                    ))}

                    <div className={styles.buttonWrapper}>
                        <Button
                            type='text'
                            icon={<PlusOutlined />}
                            size='small'
                            ghost={true}
                            onClick={addExercisesDataHandle}
                        >
                            Добавить ещё
                        </Button>
                        {typeEdit !== ChangeType.ADD_NEW && (
                            <Button
                                type='text'
                                icon={<MinusOutlined />}
                                size='small'
                                ghost={true}
                                disabled={!indexes.length}
                                onClick={deleteExercisesDataHandle}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                    {screen === 'training' && (
                        <div className={styles.saveButton}>
                            <Button
                                disabled={!(dataCreated || isLoadingCreate) || !exercises[0].name}
                                type='primary'
                                size='large'
                                onClick={onSaveTraining}
                                block={true}
                            >
                                {typeEdit === ChangeType.JOINT_TRAINING
                                    ? 'Отправить приглашение'
                                    : 'Сохранить'}
                            </Button>
                        </div>
                    )}
                </div>
            </DrawerRight>

            <ModalNotification
                textButton='Закрыть'
                onClickButton={onClickButtonError}
                type='error'
                isCloseIcon={false}
                title='При сохранении данных произошла ошибка'
                subtitle='Придётся попробовать ещё раз'
                open={openModalError}
            />

            {showAlert && screen && (isCreateSuccess || isUpdateSuccess) && (
                <Alert
                    data-test-id={DATA_TEST_ID.createTrainingSuccessAlert}
                    message={alertMessage}
                    type='success'
                    showIcon={true}
                    closable={true}
                    className={styles.alert}
                />
            )}
        </div>
    );
};
