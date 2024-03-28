import { useEffect, useState } from 'react';
import { BadgeBlocks } from '@components/badge-blocks/badge-blocks.tsx';
import { CardModal } from '@components/calendar-training/card-modal/card-modal.tsx';
import { ModalNotification } from '@components/modal-notification';
import { Portal } from '@components/portal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    resetState,
    setStateCardModal,
    trainingsSelector,
    userTraining,
} from '@redux/modules/training.ts';
import { useGetUserTrainingQuery, useLazyGetTrainingListQuery } from '@redux/serviсes/training.ts';
import { useWindowSize } from '@uidotdev/usehooks';
import {
    attachPortal,
    attachPortalMobile,
    CALENDAR_ID,
    changeCardEvent,
} from '@utils/attach-portal.ts';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date.ts';
import Calendar from 'antd/lib/calendar';
import moment, { Moment } from 'moment';

import { LocalData } from '../../constans/calendar-options.ts';
import { CardModalBody } from '../../constans/card-modal.ts';

import styles from './calendar-reting.module.css';

export const CalendarTraining = () => {
    const size = useWindowSize();
    const [parent, setParent] = useState<HTMLElement | undefined>(undefined);
    const [offsetTop, setOffsetTop] = useState(0);
    const [isDesktopVersion, setDesktopVersion] = useState(true);
    const [day, setDay] = useState(1);
    const [selectedDate, setSelectedDate] = useState(moment);
    const [openModal, setOpenModal] = useState(false);
    const training = useAppSelector(userTraining);
    const { defaultTrainings, isBlock, cardModalState } = useAppSelector(trainingsSelector);
    const dispatch = useAppDispatch();

    const [getList, { isError: isErrorRequest }] = useLazyGetTrainingListQuery();

    useGetUserTrainingQuery();
    useEffect(() => {
        if (!defaultTrainings?.length) {
            getList();
        }
    }, []);

    useEffect(() => {
        if (!cardModalState) {
            setParent(undefined);
        }
    }, [cardModalState]);

    useEffect(() => {
        if (isErrorRequest) {
            setOpenModal(true);
        }
    }, [isErrorRequest]);

    const onGetListHandler = () => {
        setOpenModal(false);
        getList();
    };

    const onCloseModal = () => {
        dispatch(resetState());
        setOpenModal(false);
    };

    useEffect(() => {
        if (Number(size.width) && Number(size.width) < 850) {
            setDesktopVersion(false);
            setParent(undefined);
        } else {
            setDesktopVersion(true);
            setParent(undefined);
            setOffsetTop(0);
        }
    }, [size.width]);

    const onStop = (event: any, date: Moment | string) => {
        if (!isBlock) {
            dispatch(setStateCardModal(CardModalBody.TRAINING));
            event.stopPropagation();
            setParent(attachPortal({ date }));
            setSelectedDate(moment(date));
            setDay(moment(date).day());
        }
    };

    const onPanelChange = () => {
        if (!isBlock) {
            changeCardEvent(false);
            setParent(undefined);
        }
    };

    const onChangeCell = (date: Moment | string) => {
        if (!isBlock) {
            setParent(attachPortal({ date }));
        }
    };

    const onSelectMonth = (date: Moment) => {
        if (!isDesktopVersion && !isBlock) {
            dispatch(setStateCardModal(CardModalBody.TRAINING));
            const { element, offsetTop: offsetTopElement } = attachPortalMobile({
                date: formatDate(date, FORMAT_Y_M_D),
            });

            setOffsetTop(offsetTopElement);
            setParent(element || undefined);
            setSelectedDate(moment(date));
        }
        changeCardEvent(true);
    };

    const onClose = () => setParent(undefined);

    const dateCellRender = (value: Moment) => {
        const trainingByDay = training[formatDate(value, FORMAT_Y_M_D)];

        if (!isDesktopVersion) {
            return trainingByDay?.length ? <div className={styles.cellMobile} /> : undefined;
        }

        return (
            <BadgeBlocks
                date={value}
                onChangeCell={onChangeCell}
                listData={trainingByDay}
                onStop={onStop}
            />
        );
    };

    return (
        <div id={CALENDAR_ID}>
            <Calendar
                fullscreen={isDesktopVersion}
                className={styles.cell}
                locale={LocalData}
                dateCellRender={dateCellRender}
                onSelect={onSelectMonth}
                onPanelChange={onPanelChange}
            />
            {parent && (
                <Portal container={parent}>
                    <CardModal
                        offsetTop={offsetTop}
                        trainings={training[formatDate(selectedDate, FORMAT_Y_M_D)]}
                        isLeft={day !== 0 && day !== 6}
                        onClose={onClose}
                        date={selectedDate}
                    />
                </Portal>
            )}

            <ModalNotification
                textButton='Обновить'
                onClickButton={onGetListHandler}
                type='warning'
                isCloseIcon={true}
                title='При открытии данных произошла ошибка'
                subtitle='Попробуйте ещё раз.'
                open={openModal}
                onClose={onCloseModal}
            />
        </div>
    );
};
