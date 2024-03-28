import React from 'react';
import androidIcon from '@shared/assets/icons/buttons/icon-android.svg';
import appleIcon from '@shared/assets/icons/buttons/icon-apple.svg';
import { Button, Card } from 'antd';

import styles from './footer-card.module.css';

const cardHeadStyle = {
    display: 'flex',
    justifyContent: 'center',
    font: 'var(--font-m)',
    padding: '12px 24px',
};

const cardBodyStyle = {
    height: '42px',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
};

export const FooterCard = () => (
    <Card
        title={
            <div className={styles.cardTitle}>
                <span className={styles.cardTitleOffer}>Скачать на телефон</span>
                <span className={styles.cardTitleHint}>Доступно в PRO-тарифе</span>
            </div>
        }
        bordered={false}
        headStyle={cardHeadStyle}
        bodyStyle={cardBodyStyle}
        className={styles.footerCard}
    >
        <React.Fragment>
            <Button type='text' className={styles.cardButton}>
                <img alt='android' src={androidIcon} />
                <span>Android OS</span>
            </Button>
            <Button type='text' className={styles.cardButton}>
                <img alt='appleIcon' src={appleIcon} />
                <span>Apple IOS</span>
            </Button>
        </React.Fragment>
    </Card>
);
