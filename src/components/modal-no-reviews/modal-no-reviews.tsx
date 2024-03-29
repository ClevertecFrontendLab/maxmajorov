import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noReviewModal from '@public/modal-error.png';
import { Paths } from '@routes/paths';
import { Button, Image, Modal } from 'antd';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import styles from './modal-no-reviews.module.scss';

type ModalNoReviewProps = {
    open: boolean;
};

export const ModalNoReview = ({ open }: ModalNoReviewProps) => {
    const navigate = useNavigate();
    const [openModal, setOpen] = useState(open);

    const handleCancel = () => {
        navigate(Paths.MAIN);
        setOpen(false);
    };

    useEffect(() => {
        if (open) setOpen(open);
    }, [open]);

    return (
        <Modal
            data-test-id={DATA_TEST_ID.modalNoReview}
            className={styles.modal}
            open={openModal}
            centered={true}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
        >
            <div className={styles.content}>
                <Image preview={false} src={noReviewModal} className={styles.image} />
                <div>
                    <h3 className={styles.title}>Что-то пошло не так</h3>
                    <div className={styles.subTitle}>Произошла ошибка, попробуйте ещё раз.</div>
                </div>
                <Button type='primary' onClick={handleCancel} className={styles.button}>
                    Назад
                </Button>
            </div>
        </Modal>
    );
};
