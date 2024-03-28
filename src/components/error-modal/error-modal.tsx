import { Dispatch, SetStateAction } from 'react';
import errorModal from '@public/error-modal.png';
import { Button, Image, Modal } from 'antd';

import styles from './error-modal.module.scss';

type ErrorModalProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setOpenNewReview: Dispatch<SetStateAction<boolean>>;
};

export const ErrorModal = ({ open, setOpen, setOpenNewReview }: ErrorModalProps) => {
    const handleCancel = () => {
        setOpen(false);
    };

    const handleNewReview = () => {
        setOpen(false);
        setOpenNewReview(true);
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
                <Image preview={false} src={errorModal} className={styles.image} />
                <div>
                    <h3 className={styles.title}>Данные не сохранились</h3>
                    <div className={styles.subTitle}>Произошла ошибка, попробуйте ещё раз.</div>
                </div>
                <div className={styles.buttonBlock}>
                    <Button
                        type='primary'
                        onClick={handleNewReview}
                        className={styles.button}
                        data-test-id='write-review-not-saved-modal'
                    >
                        Написать отзыв
                    </Button>
                    <Button type='default' onClick={handleCancel} className={styles.button}>
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
