import { Portal } from '@components/portal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { alertSelector, setAppAlert } from '@redux/modules/app';
import { Alert } from 'antd';

import styles from './app-alert.module.css';

export const AppAlert = () => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector(alertSelector);

    if (!alert.type) return null;

    const { message, type } = alert;

    const handleClose = () => {
        dispatch(
            setAppAlert({
                message: '',
            }),
        );
    };

    return (
        <Portal>
            <div className={styles.wrapper}>
                <Alert
                    data-test-id='alert'
                    className={styles.alert}
                    message={message}
                    type={type}
                    showIcon={true}
                    closable={true}
                    onClose={handleClose}
                />
            </div>
        </Portal>
    );
};
