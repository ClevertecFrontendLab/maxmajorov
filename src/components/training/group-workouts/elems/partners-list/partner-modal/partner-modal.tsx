import React from 'react';
import { CheckCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { UserJointTrainigList } from '@redux/types/invite';
import { Avatar, Button, Col, Modal, Row } from 'antd';
import { Nullable } from 'src/types/nullable';

import { DATA_TEST_ID } from '../../../../../../constans/data-test-id';

import styles from './partner-modal.module.css';

type PartnerModalProps = {
    open: boolean;
    onClose: VoidFunction;
    partner: UserJointTrainigList;
    onRejectJointTraining: (inviteId: Nullable<string>) => void;
};

export const PartnerModal: React.FC<PartnerModalProps> = ({
    open,
    onClose,
    partner,
    onRejectJointTraining,
}) => (
    <Modal
        data-test-id={DATA_TEST_ID.partnerModal}
        style={{ padding: 0 }}
        className={styles.modal}
        open={open}
        centered={true}
        onCancel={onClose}
        footer={null}
        maskStyle={{ backdropFilter: 'blur(6px)' }}
    >
        <React.Fragment>
            <Row className={styles.partnerInfo}>
                <Col span={12}>
                    <Avatar
                        size={42}
                        alt={partner.name}
                        src={partner.imageSrc}
                        icon={!partner.imageSrc && <UserOutlined />}
                    />
                    <span style={{ marginLeft: '8px' }}>{partner.name}</span>
                </Col>
                <Col sm={{ span: 12 }} xs={{ span: 24 }} className={styles.metrics}>
                    <Col span={12} className={styles.indicators}>
                        <div>Тип тренировки:</div>
                        <div>Средняя нагрузка:</div>
                    </Col>
                    <Col span={12} className={styles.trainingInfo}>
                        <div>{partner.trainingType}</div>
                        <div>{partner.avgWeightInWeek} кг/нед</div>
                    </Col>
                </Col>
            </Row>
            <Row className={styles.controls}>
                <Col sm={{ span: 12 }} xs={{ span: 24 }} className={styles.status}>
                    тренировка одобрена
                    <CheckCircleTwoTone twoToneColor='#52c41a' />
                </Col>
                <Col sm={{ span: 12 }} xs={{ span: 24 }} style={{ width: '100%' }}>
                    <Button
                        size='middle'
                        block={true}
                        onClick={() => onRejectJointTraining(partner.inviteId)}
                    >
                        Отменить тренировку
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    </Modal>
);
