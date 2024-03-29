import React, { useState } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { Status } from '@constants/status';
import { TRAININGS } from '@constants/training-types';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteListSelector } from '@redux/modules/invite';
import { useGetAcceptedUsersListQuery, useSendAnswerInviteMutation } from '@redux/serviсes/invite';
import { formatDate } from '@utils/format-date';
import { Avatar, Button, Typography } from 'antd';

import { InviteTrainingCard } from './invite-training-card';

import styles from './invite-list.module.css';

type InviteListProps = {
    onShowPartnersList: (value: boolean) => void;
};

export const InviteList: React.FC<InviteListProps> = ({ onShowPartnersList }) => {
    const [openInviteTrainingCard, setOpenInviteTrainingCard] = useState(false);
    const [selectedInviteId, setSelectedInviteId] = useState('');

    const [collapsed, setCollapsed] = useState(true);

    const inviteList = useAppSelector(inviteListSelector);
    const inviteListToRender = collapsed ? [inviteList[0]] : inviteList;

    const { refetch } = useGetAcceptedUsersListQuery();
    const [sendAnswerInviteMutation, { isSuccess }] = useSendAnswerInviteMutation();

    const acceptInviteHandler = async (id: string) => {
        await sendAnswerInviteMutation({ id, status: Status.ACCEPTED });
        await refetch();
        if (!isSuccess) {
            onShowPartnersList(true);
        }
    };

    const rejectInviteHandler = (id: string) => {
        sendAnswerInviteMutation({ id, status: Status.REJECTED });
    };

    const openInviteTrainingCardHandler = (id: string) => {
        setSelectedInviteId(id);
        setOpenInviteTrainingCard(true);
    };

    if (!inviteList.length) {
        return null;
    }

    const collapseHandler = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={styles.inviteList}>
            <Typography.Text type='secondary'>Новое сообщение({inviteList.length})</Typography.Text>
            {inviteListToRender.map((item) => (
                // eslint-disable-next-line
                <div key={item._id} className={styles.inviteCard}>
                    <div className={styles.userInfo}>
                        <Avatar
                            size={42}
                            alt={item.from.firstName}
                            src={item.from.imageSrc}
                            icon={<UserOutlined />}
                        />
                        <div className={styles.userName}>
                            <Typography.Text>{item.from.firstName}</Typography.Text>
                            <Typography.Text>{item.from.lastName}</Typography.Text>
                        </div>
                    </div>
                    <div className={styles.message}>
                        <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
                            {formatDate(item.createdAt)}
                        </Typography.Text>
                        <Typography.Title level={5} style={{ color: '#061178', marginTop: '8px' }}>
                            Привет, я ищу партнёра для совместных{' '}
                            {TRAININGS[item.training.name as keyof typeof TRAININGS]}. Ты хочешь
                            присоединиться ко мне на следующих тренировках?
                        </Typography.Title>
                        <Typography.Text
                            className={styles.detailsLink}
                            // eslint-disable-next-line
                            onClick={() => openInviteTrainingCardHandler(item._id)}
                        >
                            Посмотреть детали тренировки
                        </Typography.Text>
                        {/* eslint-disable-next-line */}
                        {openInviteTrainingCard && selectedInviteId === item._id && (
                            <InviteTrainingCard
                                selectedInvite={item}
                                onClose={() => setOpenInviteTrainingCard(false)}
                            />
                        )}
                    </div>
                    <div className={styles.controls}>
                        <Button
                            type='primary'
                            // eslint-disable-next-line
                            onClick={() => acceptInviteHandler(item._id)}
                        >
                            Тренироваться вместе
                        </Button>
                        {/* eslint-disable-next-line */}
                        <Button onClick={() => rejectInviteHandler(item._id)}>
                            Отклонить запрос
                        </Button>
                    </div>
                </div>
            ))}

            {inviteList.length > 1 && (
                <Button
                    className={styles.collapseButton}
                    type='text'
                    ghost={true}
                    icon={collapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={collapseHandler}
                >
                    {collapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
