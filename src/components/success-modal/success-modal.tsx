import { Dispatch, SetStateAction } from 'react';
import successModal from '@public/success-modal.svg';
import { Button, Image, Modal } from 'antd';

import styles from './success-modal.module.scss';

type SuccessModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const SuccessModal = ({ open, setOpen }: SuccessModalProps) => {
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            className={styles.modal}
            open={open}
            centered={true}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
        >
            <div className={styles.content}>
                <Image preview={false} src={successModal} className={styles.image} />
                <div>
                    <h3 className={styles.title}>Отзыв успешно опубликован</h3>
                </div>
                <div className={styles.buttonBlock}>
                    <Button type='primary' onClick={handleCancel} className={styles.button}>
                        Отлично
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
