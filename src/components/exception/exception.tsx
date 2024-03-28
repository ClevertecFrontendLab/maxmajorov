import { FC, ReactNode } from 'react';
import { Typography } from 'antd';

import ForbiddenImage from './assets/403.svg?react';
import NotFoundImage from './assets/404.svg?react';

import styles from './exception.module.css';

const { Title, Text } = Typography;

type ExceptionProps = {
    status?: '404' | '403';
    title?: string;
    subTitle?: string;
    extra?: ReactNode;
};

export const Exception: FC<ExceptionProps> = ({ status, title, subTitle, extra }) => (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            {status && status === '403' ? <ForbiddenImage /> : <NotFoundImage />}
            <div className={styles.textWrapper}>
                {title && (
                    <Title level={3} className={styles.title}>
                        {title}
                    </Title>
                )}
                {subTitle && <Text className={styles.subTitle}>{subTitle}</Text>}
            </div>
            {extra}
        </div>
    </div>
);
