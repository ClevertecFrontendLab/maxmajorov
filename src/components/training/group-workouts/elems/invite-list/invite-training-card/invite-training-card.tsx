import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed';
import { Invite } from '@redux/types/invite';
import { getKeyByPeriod } from '@utils/find-period-options';
import { formatDate } from '@utils/format-date';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';

import { DATA_TEST_ID } from '../../../../../../constans/data-test-id';

import styles from './invite-training-card.module.css';

type CardProps = {
    selectedInvite: Invite;
    onClose: VoidFunction;
};

export const InviteTrainingCard: React.FC<CardProps> = ({ selectedInvite, onClose }) => (
    <Card data-test-id={DATA_TEST_ID.jointTrainingReviewCard} className={styles.card}>
        <div className={styles.cardWrapper}>
            <div className={styles.titleWrapper}>
                <BadgeChanged
                    isStatus={true}
                    isEdit={false}
                    text={selectedInvite?.training.name}
                    date={moment(new Date())}
                />

                <Button type='text' size='small' icon={<CloseOutlined />} onClick={onClose} />
            </div>
            <div className={styles.cardBody}>
                {selectedInvite.training.parameters?.period && (
                    <div className={styles.flexBetween}>
                        <Typography.Text style={{ fontSize: '16px' }}>
                            {getKeyByPeriod(selectedInvite.training.parameters?.period)}
                        </Typography.Text>
                        <Typography.Text>
                            {formatDate(selectedInvite.training.date)}
                        </Typography.Text>
                    </div>
                )}

                {selectedInvite?.training.exercises?.map((ex) => (
                    <div className={styles.flexBetween} style={{ marginTop: '8px' }}>
                        <Typography.Text type='secondary'>{ex.name}</Typography.Text>
                        <Typography.Text className={styles.iteration}>
                            {`${ex.approaches} x (${ex.replays})`}
                        </Typography.Text>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);
