import { FC, ReactNode } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import styles from './drawer-right.module.css';

type DrawerLeftProps = {
    iconClose: ReactNode;
    title: string;
    onClose: () => void;
    open: boolean;
    children?: ReactNode;
};

export const DrawerRight: FC<DrawerLeftProps> = ({ open, children, onClose, title, iconClose }) => (
    <Drawer
        data-test-id={DATA_TEST_ID.modalDrawerRight}
        title={title}
        destroyOnClose={true}
        placement={window.innerWidth < 480 ? 'bottom' : 'right'}
        height={window.innerWidth < 480 ? '90vh' : '100vh'}
        closable={true}
        zIndex={1050}
        closeIcon={iconClose}
        open={open}
        className={styles.drawer}
        extra={
            <Button
                data-test-id={DATA_TEST_ID.modalDrawerRightButtonClose}
                type='text'
                size='middle'
                icon={<CloseOutlined />}
                onClick={onClose}
            />
        }
    >
        {children}
    </Drawer>
);
