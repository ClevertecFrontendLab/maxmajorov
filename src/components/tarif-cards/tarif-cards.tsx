import { useCallback, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import imgFree from '@public/tarifs/free.jpg';
import imgPro from '@public/tarifs/pro.jpg';
import { profileCredentialSelector } from '@redux/modules/profile';
import { Button, Card, Typography } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { ComparingDrawer } from './comparing-drawer';

import styles from './tarif-cards.module.css';

const Tarifs = [
    { title: 'FREE tarif', img: imgFree, dataTestId: 'free-tariff-card' },
    { title: 'PRO tarif', img: imgPro, forPro: true, dataTestId: 'pro-tariff-card' },
];

export const TarifCards = () => {
    const credentials = useAppSelector(profileCredentialSelector);

    const [openСomparison, setOpenСomparison] = useState(false);

    const isProUser = credentials.tariff;
    const date = moment(credentials.tariff?.expired);
    const month = date.month() + 1;
    const day = date.date();

    const handleOpen = () => {
        setOpenСomparison(true);
    };

    const handleClose = useCallback(() => {
        setOpenСomparison(false);
    }, []);

    return (
        <div>
            <Typography.Title className={styles.title} level={4}>
                Мой тариф
            </Typography.Title>
            <div className={styles.cards}>
                {Tarifs.map(({ title, img, forPro, dataTestId }) => {
                    const hidePro = !isProUser && forPro;

                    return (
                        <Card
                            className={styles.card}
                            title={title}
                            extra={
                                <Button type='link' onClick={handleOpen}>
                                    Подробнее
                                </Button>
                            }
                            key={title}
                            hoverable={false}
                            data-test-id={dataTestId}
                            cover={
                                <div
                                    className={classNames(styles.cover, {
                                        [styles.inactive]: hidePro,
                                    })}
                                >
                                    <img alt={title} src={img} />
                                    {hidePro && <div className={styles.inactiveBg} />}
                                </div>
                            }
                        >
                            {!hidePro && (
                                <div className={styles.active}>
                                    <Typography.Title level={5}>
                                        активен
                                        {isProUser &&
                                            title.includes('PRO') &&
                                            ` до ${String(day).padStart(2, '0')}.${String(
                                                month,
                                            ).padStart(2, '0')}`}
                                    </Typography.Title>
                                    {title.includes('FREE') && <CheckOutlined />}
                                </div>
                            )}
                            {hidePro && (
                                <Button
                                    data-test-id='activate-tariff-btn'
                                    className={styles.btn}
                                    type='primary'
                                    onClick={handleOpen}
                                >
                                    Активировать
                                </Button>
                            )}
                        </Card>
                    );
                })}
            </div>
            <ComparingDrawer open={openСomparison} handleClose={handleClose} />
        </div>
    );
};
