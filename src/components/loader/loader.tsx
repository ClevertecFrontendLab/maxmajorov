import { useEffect } from 'react';
import { Portal } from '@components/portal';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/modules/app';
import { Spin } from 'antd';

import { CustomLoader } from './custom-loader';

import styles from './loader.module.css';

export const Loader = () => {
    const { isLoading } = useAppSelector(appSelector);

    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = isLoading ? 'hidden' : '';
    }, [isLoading]);

    if (!isLoading) {
        return null;
    }

    return (
        <Portal>
            <div className={styles.background}>
                <Spin indicator={<CustomLoader />} data-test-id='loader' />
            </div>
        </Portal>
    );
};
