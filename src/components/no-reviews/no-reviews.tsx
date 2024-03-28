import { useState } from 'react';
import { ModalReview } from '@components/modal-review';
import { Button, Card } from 'antd';

import styles from './no-reviews.module.scss';

export const NoReviews = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className={styles.noReviewCardWrap}>
            <Card className={styles.noReviewCard} title={false} bordered={false}>
                <h3 className={styles.title}>Оставьте свой отзыв первым</h3>
                <div className={styles.subTitle}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </div>
            </Card>
            <Button
                type='primary'
                onClick={showModal}
                className={styles.buttonOpen}
                data-test-id='write-review'
            >
                Написать отзыв
            </Button>
            <ModalReview open={open} setOpen={setOpen} />
        </div>
    );
};
