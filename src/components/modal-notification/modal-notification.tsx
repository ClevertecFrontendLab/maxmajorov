import { FC, memo, useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { ModalNotificationTheme } from '@constants/modal-notification-theme.ts';
import { Button, Modal, notification, Typography } from 'antd';
import classNames from 'classnames';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import styles from './modal-notification.module.css';

type ModalNotificationProps = {
    textButton?: string;
    title: string;
    isCloseIcon?: boolean;
    type: 'warning' | 'error';
    open: boolean;
    onClose?: () => void;
    onClickButton: () => void;
    subtitle?: string;
    theme?: ModalNotificationTheme;
    dataTestId?: string;
};

export const ModalNotification: FC<ModalNotificationProps> = memo(
    ({
        open,
        onClickButton,
        onClose,
        title,
        isCloseIcon = false,
        type,
        subtitle,
        textButton,
        theme = ModalNotificationTheme.DEFAULT,
        dataTestId,
    }) => {
        const [openModal, setOpenModal] = useState(true);

        const openNotification = () => {
            const key = 'open';
            const btn = (
                <Button
                    type='primary'
                    size='middle'
                    onClick={onClickButton}
                    data-test-id={dataTestId || DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    {textButton}
                </Button>
            );

            notification.open({
                message: (
                    <Typography.Title
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle}
                        level={5}
                    >
                        {title}
                    </Typography.Title>
                ),
                description: (
                    <Typography.Text
                        data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubTitle}
                        type='secondary'
                        className={classNames({
                            [styles.subtitle]: theme === ModalNotificationTheme.ONE_COLOR,
                        })}
                    >
                        {subtitle}
                    </Typography.Text>
                ),
                btn,
                key,
                icon: (
                    <CloseCircleOutlined
                        className={type === 'warning' ? styles.iconWarning : styles.iconError}
                    />
                ),
                duration: 0,
                closeIcon: isCloseIcon ? (
                    <CloseOutlined data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose} />
                ) : (
                    ''
                ),
                onClose,
                className: styles.notification,
                placement: 'top',
            });
        };

        useEffect(() => {
            if (open && !openModal) {
                openNotification();

                return;
            }
            notification.close('open');
            setOpenModal(false);
        }, [open, openModal]);

        return (
            <Modal
                style={{ padding: 0 }}
                className={styles.modal}
                open={open}
                maskClosable={true}
                centered={true}
                onCancel={onClose}
                footer={null}
                closable={false}
                maskStyle={{ backdropFilter: 'blur(6px)' }}
            >
                <div />
            </Modal>
        );
    },
);
