import { useState } from 'react';
import { ErrorModal } from '@components/error-modal';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalReview } from '@components/modal-review';
import { NoReviews } from '@components/no-reviews';
import { ReviewCard } from '@components/review-card';
import { useGetFeedbacksQuery } from '@redux/serviсes/feedback';
import { Button } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { useCreateFeedback } from './hooks/use-create-feedback';

import styles from './reviews-page.module.css';

export const ReviewsPage = () => {
    const [openNewReview, setOpenNewReview] = useState(false);
    const [isAllReview, setIsAllReview] = useState(false);
    const { openErrorModal } = useCreateFeedback();
    const [openErrModal, setOpenErrorModal] = useState(openErrorModal);
    const { data, isError } = useGetFeedbacksQuery();

    const isReviews = data && data.length === 0;

    const handleShowAllReviews = () => {
        setIsAllReview(!isAllReview);
    };

    const showModal = () => {
        setOpenNewReview(true);
    };

    return (
        <div className={styles.reviewWrap}>
            {isReviews && <NoReviews />}
            {!isReviews && (
                <div className={styles.reviewWrap}>
                    {data && (
                        <div
                            data-test-id='reviews-cards'
                            className={classNames(styles.reviewBlock, {
                                [styles.reviewAllBlock]: isAllReview,
                            })}
                        >
                            {isAllReview
                                ? data
                                      .toSorted((a, b) => moment(b.createdAt).diff(a.createdAt))
                                      .map((card) => <ReviewCard key={card.id} {...card} />)
                                : data
                                      .toSorted((a, b) => moment(b.createdAt).diff(a.createdAt))
                                      .slice(0, 4)
                                      .map((card) => <ReviewCard key={card.id} {...card} />)}
                        </div>
                    )}
                    <div className={styles.buttonBlock}>
                        <Button
                            type='primary'
                            onClick={showModal}
                            className={styles.buttonOpen}
                            data-test-id='write-review'
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            onClick={handleShowAllReviews}
                            data-test-id='all-reviews-button'
                        >
                            <span className={styles.linkButtonText}>
                                {isAllReview ? 'Свернуть отзывы' : 'Развернуть все отзывы'}
                            </span>
                        </Button>
                    </div>

                    <ModalReview open={openNewReview} setOpen={setOpenNewReview} />

                    <ModalNoReview open={isError} />

                    <ErrorModal
                        open={openErrModal}
                        setOpen={setOpenErrorModal}
                        setOpenNewReview={setOpenNewReview}
                    />
                </div>
            )}
        </div>
    );
};
