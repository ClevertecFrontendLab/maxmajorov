import React, { useEffect, useState } from 'react';
import { ModalNotification } from '@components/modal-notification';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { acceptedUsersListSelector } from '@redux/modules/invite';
import { useRemoveJointTrainingMutation } from '@redux/serviсes/invite';
import { UserJointTrainigList } from '@redux/types/invite';
import { List, Space, Typography } from 'antd';
import { Nullable } from 'src/types/nullable';

import { UserCard } from '../user-card';

import { PartnerModal } from './partner-modal';

import styles from './partners-list.module.css';

type PartnersListProps = {
    onShowList?: (value: boolean) => void;
    screen: string;
};

export const PartnersList: React.FC<PartnersListProps> = ({ onShowList, screen }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState({} as UserJointTrainigList);

    const acceptedUsersList = useAppSelector(acceptedUsersListSelector);

    const [removeJointTrainingMutation, { isSuccess, isError }] = useRemoveJointTrainingMutation();

    const onOpenModal = () => {
        setOpenModal(true);
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const rejectJointTrainigHandler = (inviteId: Nullable<string>) => {
        removeJointTrainingMutation({ inviteId });
    };

    const onClickButtonError = () => {
        setOpenModalError(false);
    };

    useEffect(() => {
        if (isSuccess) {
            onShowList?.(false);
            setOpenModal((prev) => !prev);
        }
    }, [isSuccess, onShowList]);

    useEffect(() => {
        if (isError) {
            setOpenModalError(true);
        }
    }, [isError]);

    return (
        <React.Fragment>
            <div className={styles.partners}>
                <Typography.Title level={4} className={styles.title}>
                    Мои партнёры по тренировкам
                </Typography.Title>
                {acceptedUsersList.length ? (
                    <Space className={styles.partnersList} onClick={onOpenModal}>
                        <List
                            dataSource={acceptedUsersList}
                            renderItem={(partner, index) => (
                                <UserCard
                                    partner={partner}
                                    screen={screen}
                                    onRejectJointTraining={rejectJointTrainigHandler}
                                    setSelectedPartner={setSelectedPartner}
                                    index={index}
                                />
                            )}
                        />
                    </Space>
                ) : (
                    <Typography.Text>
                        У вас пока нет партнёров для совместных тренировок
                    </Typography.Text>
                )}
            </div>

            <PartnerModal
                open={openModal}
                onClose={onCloseModal}
                onRejectJointTraining={rejectJointTrainigHandler}
                partner={selectedPartner}
            />
            <ModalNotification
                textButton='Закрыть'
                onClickButton={onClickButtonError}
                type='error'
                isCloseIcon={false}
                title='При сохранении данных произошла ошибка '
                subtitle='Попробуйте ещё раз.'
                open={openModalError}
            />
        </React.Fragment>
    );
};
