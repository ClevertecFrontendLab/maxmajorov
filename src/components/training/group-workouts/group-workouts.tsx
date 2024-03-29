import React, { useEffect, useState } from 'react';
import { ModalNotification } from '@components/modal-notification';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { jointTrainingListSelector } from '@redux/modules/invite';
import { userTraining } from '@redux/modules/training';
import {
    useGetAcceptedUsersListQuery,
    useLazyGetUserJointTrainingListQuery,
} from '@redux/serviсes/invite';
import {} from '@redux/serviсes/training';
import { getFavouriteTraining } from '@utils/favourite-training-type';
import { Button, Divider, Typography } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

import { InviteList } from './elems/invite-list';
import { JointTrainingList } from './elems/joint-training-list';
import { PartnersList } from './elems/partners-list';

import styles from './group-workouts.module.css';

export const GroupWorkouts: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [showJointList, setShowJointList] = useState(false);
    const [showPartnersList, setShowPartnersList] = useState(false)

    const jointTrainingList = useAppSelector(jointTrainingListSelector);
   
    const userTrainings = useAppSelector(userTraining);

    useGetAcceptedUsersListQuery();

    const [getJointTrainigList, { isError }] = useLazyGetUserJointTrainingListQuery();

    const getJointTrainingListHandler = () => {
        getJointTrainigList({});
        setShowJointList(true);
    };

    const getJointTrainingListByTypeHandler = () => {
        const trainingType = getFavouriteTraining(userTrainings);

        getJointTrainigList({ trainingType });
        setShowJointList(true);
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const goBackHandler = () => {
        setShowJointList(false);
    };

    useEffect(() => {       
        if (isError) {
            setOpenModal(true);
        }
    }, [isError]);

    if (jointTrainingList && showJointList && !isError) {
        return <JointTrainingList goBack={goBackHandler} />;
    }

    if (showPartnersList) {
        return <PartnersList onShowList={setShowPartnersList} screen='accepted-users' />;
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <InviteList onShowPartnersList={setShowPartnersList}/>
                <div className={styles.description}>
                    <Typography.Title style={{ color: '#061178' }} level={3}>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь
                        найти друга для совместных тренировок среди других пользователей.
                    </Typography.Title>
                    <Typography.Text>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </Typography.Text>
                    <Divider />
                    <ButtonGroup className={styles.buttonGroup}>
                        <Button
                            type='text'
                            style={{ color: '#2f54eb' }}
                            onClick={getJointTrainingListHandler}
                        >
                            Случайный выбор
                        </Button>
                        <Button type='text' onClick={getJointTrainingListByTypeHandler}>
                            Выбор друга по моим тренировкам
                        </Button>
                    </ButtonGroup>
                </div>
                <PartnersList screen='accepted-users' />
            </div>

            <ModalNotification
                textButton='Обновить'
                onClickButton={() => getJointTrainigList({})}
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
