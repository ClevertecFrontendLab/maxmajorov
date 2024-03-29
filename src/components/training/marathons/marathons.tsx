import React from 'react';
import { Typography } from 'antd';

import styles from './marathons.module.css';

export const Marathons: React.FC = () => (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Typography.Title level={3} className={styles.title}>
                    В данный период <br /> ни один марафон не проводится
                </Typography.Title>
                <Typography.Text type='secondary'>
                    Заглядывайте сюда почаще <br /> и ваш первый марафон скоро начнётся.
                </Typography.Text>
            </div>
        </div>
    );
