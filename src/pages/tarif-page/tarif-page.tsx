import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalReview } from '@components/modal-review';
import { RequireAuth } from '@components/require-auth';
import { TarifCards } from '@components/tarif-cards';
import { TarifOptions } from '@components/tarif-options';
import { Paths } from '@routes/paths';
import { Button } from 'antd';

import styles from './tarif-page.module.css';

export const TarifPage = () => {
    const [writeReview, setWriteReview] = useState(false);

    const handleClick = () => {
        setWriteReview(true);
    };

    return (
        <RequireAuth>
            <div className={styles.back}>
                <TarifCards />
                <TarifOptions />
                <div className={styles.testimonials}>
                    <Button type='primary' onClick={handleClick}>
                        Написать отзыв
                    </Button>
                    <Link to={Paths.REVIEWS}>
                        <Button type='link'>Смотреть все отзывы</Button>
                    </Link>
                    <ModalReview open={writeReview} setOpen={setWriteReview} />
                </div>
            </div>
        </RequireAuth>
    );
};
