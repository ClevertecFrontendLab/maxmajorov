import React, { ReactNode, useEffect, useState } from 'react';
import { ModalNotification } from '@components/modal-notification';
import { GroupWorkouts } from '@components/training/group-workouts/group-workouts';
import { Marathons } from '@components/training/marathons';
import { MyWorkouts } from '@components/training/my-workouts/my-workouts.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { inviteListSelector } from '@redux/modules/invite';
import { resetStateCreating, trainingsSelector } from '@redux/modules/training.ts';
import { useGetUserTrainingQuery, useLazyGetTrainingListQuery } from '@redux/serviсes/training.ts';
import { Badge, Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import classNames from 'classnames';

import styles from './training-page.module.css';

type TabsType = { label: string; key: string; badgeCount?: boolean; children: ReactNode };

const tabsItems: TabsType[] = [
    {
        label: 'Мои тренировки',
        key: 'my-workouts',
        children: <MyWorkouts />,
    },
    {
        label: 'Совместные тренировки',
        key: 'group-workouts',
        badgeCount: true,
        children: <GroupWorkouts />,
    },
    {
        label: 'Марафоны',
        key: 'marathons',
        children: <Marathons />,
    },
];

export const TrainingPage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentTab, setCurrentTab] = useState('');

    const { defaultTrainings } = useAppSelector(trainingsSelector);
    const inviteList = useAppSelector(inviteListSelector);

    const dispatch = useAppDispatch();

    useGetUserTrainingQuery();
    const [getTrainingList, { isError: isGetTrainingListError }] = useLazyGetTrainingListQuery();

    useGetUserTrainingQuery();
    const retryRequestHandler = () => {
        setOpenModal(false);
        getTrainingList();
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const currentTabHandler = (activeKey: string) => setCurrentTab(activeKey);

    useEffect(() => {
        if (!defaultTrainings?.length) {
            getTrainingList();
        }
    }, []);

    useEffect(() => {
        if (isGetTrainingListError) {
            setOpenModal(true);
        }
    }, [isGetTrainingListError]);

    useEffect(() => {
        dispatch(resetStateCreating());
    }, [dispatch]);

    const renderTab = (tabItem: TabsType) => {
        if (tabItem.badgeCount && inviteList.length !== 0) {
            return (
                <div>
                    {tabItem.label}
                    <Badge count={inviteList.length} className={styles.badge} />
                </div>
            );
        }

        return tabItem.label;
    };

    return (
        <div
            className={classNames(styles.root, {
                [styles.marathonTab]: currentTab === 'marathons',
            })}
        >
            <Tabs onChange={currentTabHandler}>
                {tabsItems.map((tabItem) => (
                    <TabPane tab={renderTab(tabItem)} key={tabItem.key}>
                        {tabItem.children}
                    </TabPane>
                ))}
            </Tabs>

            <ModalNotification
                textButton='Обновить'
                onClickButton={retryRequestHandler}
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
