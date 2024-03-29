import { Dispatch, SetStateAction, useState } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { FeedbackFieldNames } from '@common-types/credentials';
import { ErrorModal } from '@components/error-modal';
import { SuccessModal } from '@components/success-modal';
import { useCreateFeedback } from '@pages/reviews-page/hooks/use-create-feedback';
import { Button, Form, Input, Modal, Rate } from 'antd';

import styles from './modal-review.module.scss';

type ModalReviewProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const { TextArea } = Input;

export const ModalReview = ({ open, setOpen }: ModalReviewProps) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const {
        formNewReview,
        onFinish,
        openErrorModal,
        setOpenErrorModal,
        openSuccessModal,
        setOpenSuccessModal,
    } = useCreateFeedback();

    const handleOk = () => {
        setMessage('');
        setRating(0);
        setOpen(false);
    };

    const handleCancel = () => {
        setMessage('');
        setRating(0);
        setOpen(false);
    };

    const handleChangeMessage = (value: string) => {
        setMessage(value);
    };

    const handleChangeRating = (value: number) => {
        setRating(value);
    };

    return (
        <div>
            <Modal
                className={styles.form}
                open={open}
                title='Ваш отзыв'
                onOk={handleOk}
                centered={true}
                onCancel={handleCancel}
                width={540}
                maskStyle={{ backdropFilter: 'blur(6px)' }}
                footer={
                    <Button
                        form='feedback-form'
                        type='primary'
                        className={styles.submit}
                        htmlType='submit'
                        block={true}
                        data-test-id='new-review-submit-button'
                        onClick={handleOk}
                    >
                        Опубликовать
                    </Button>
                }
            >
                <Form
                    id='feedback-form'
                    form={formNewReview}
                    onFinish={onFinish}
                    requiredMark={false}
                    scrollToFirstError={true}
                    style={{ width: '100%' }}
                >
                    <Form.Item name={FeedbackFieldNames.rating}>
                        <Rate
                            character={<StarOutlined color='#faad14' />}
                            value={rating}
                            onChange={(value) => handleChangeRating(value)}
                            className={styles.rate}
                        />
                    </Form.Item>
                    <Form.Item name={FeedbackFieldNames.message}>
                        <TextArea
                            autoSize={true}
                            rows={2}
                            placeholder='Введите текст отзыва'
                            value={message}
                            onChange={(e) => handleChangeMessage(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <ErrorModal
                open={openErrorModal}
                setOpen={setOpenErrorModal}
                setOpenNewReview={setOpen}
            />
            <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
        </div>
    );
};
