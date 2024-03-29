import React, { useCallback } from 'react';
import { CheckCircleTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { HighLightText } from '@components/highlight-text';
import { ChangeType } from '@constants/card-modal';
import { STATUS, Status } from '@constants/status';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setStateLeftMenu } from '@redux/modules/app';
import { setSelectedUser } from '@redux/modules/invite';
import { addDefaultTraining, setTrainingData, setTypeEdit } from '@redux/modules/training';
import { UserJointTrainigList } from '@redux/types/invite';
import { Avatar, Button, Card, Col, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import { Nullable } from 'src/types/nullable';

import { DATA_TEST_ID } from '../../../../../constans/data-test-id';

import styles from './user-card.module.css';

type CardProps = {
    partner: UserJointTrainigList;
    screen: string;
    onRejectJointTraining: (inviteId: Nullable<string>) => void;
    index: number;
    searchFilter?: string;
    setSelectedPartner?: (partner: UserJointTrainigList) => void;
    onClick?: VoidFunction;
};

export const UserCard: React.FC<CardProps> = ({
    partner,
    screen,
    onRejectJointTraining,
    searchFilter,
    setSelectedPartner,
    onClick,
    index,
}) => {
    const dispatch = useAppDispatch();

    const rejectJointTrainigHandler = (inviteId: Nullable<string>) => {
        onRejectJointTraining(inviteId);
    };

    const openRightMenuHandler = () => {
        dispatch(setStateLeftMenu());
        dispatch(setTypeEdit(ChangeType.JOINT_TRAINING));
        dispatch(setSelectedUser(partner));
        dispatch(
            setTrainingData({
                parameters: { jointTraining: true, repeat: false, participants: [], period: null },
            }),
        );
        dispatch(addDefaultTraining());
    };

    const onClickHandler = () => {
        setSelectedPartner?.(partner);
        onClick?.();
    };

    const highlight = useCallback(
        (text: string) => <HighLightText searchFilter={searchFilter} text={text} />,
        [searchFilter],
    );

    return (
        <Card
            data-test-id={`${DATA_TEST_ID.jointTrainingCards}${index}`}
            key={partner.id}
            className={classNames(styles.userCard, {
                [styles.blueBackground]: screen === 'joint-list',
                [styles.grayBackground]: partner.status === Status.REJECTED,
            })}
            onClick={onClickHandler}
        >
            <div>
                <Row className={styles.userInfo}>
                    <Col>
                        <Avatar
                            size={42}
                            alt={partner.name}
                            src={partner.imageSrc}
                            icon={!partner.imageSrc && <UserOutlined />}
                        />
                    </Col>
                    <Col style={{ marginLeft: '8px' }}>
                        <div style={{ width: '50px' }}> {highlight(partner.name)}</div>
                    </Col>
                </Row>
                <Row className={styles.indicators}>
                    <Col span={15}>
                        <div>Тип тренировки:</div>
                        <div style={{ marginTop: '4px' }}>Средняя нагрузка:</div>
                    </Col>
                    <Col span={9} className={styles.trainingInfo}>
                        <div>{partner.trainingType}</div>
                        <div style={{ marginTop: '4px' }}>{partner.avgWeightInWeek} кг/нед</div>
                    </Col>
                </Row>
                {screen === 'joint-list' && (
                    <React.Fragment>
                        {partner.status === null ? (
                            <Button
                                block={true}
                                size='middle'
                                type='primary'
                                onClick={openRightMenuHandler}
                                style={{ marginTop: '16px' }}
                            >
                                Создать тренировку
                            </Button>
                        ) : (
                            <Button
                                block={true}
                                size='middle'
                                type={partner.status === Status.ACCEPTED ? 'default' : 'primary'}
                                onClick={() => rejectJointTrainigHandler(partner.inviteId)}
                                style={{ marginTop: '16px' }}
                                disabled={
                                    partner.status === Status.REJECTED ||
                                    partner.status === Status.PENDING
                                }
                            >
                                {partner.status === Status.ACCEPTED
                                    ? 'Отменить тренировку'
                                    : 'Создать тренировку'}
                            </Button>
                        )}
                        {partner.status && (
                            <div className={styles.status}>
                                {STATUS[partner.status as keyof typeof STATUS]}
                                {partner.status === Status.REJECTED && (
                                    <Tooltip
                                        placement='topRight'
                                        overlayStyle={{ width: '150px' }}
                                        title='повторный запрос будет доступнен
                                    через 2 недели'
                                    >
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                )}
                                {partner.status === Status.ACCEPTED && (
                                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                                )}
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        </Card>
    );
};
