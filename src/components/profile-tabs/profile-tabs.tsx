import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TabArrayType } from '@components/profile-tabs/types/tabs';
import { Tabs } from 'antd';

import styles from './profile-tabs.module.css';

type ProfileTabsProps = {
    basePath: string;
    tabs: TabArrayType;
    onTabClick?: (key: string) => void;
};

export const ProfileTabs: FC<ProfileTabsProps> = ({ tabs, basePath, onTabClick }) => {
    const { tabName } = useParams();

    const firstTabKey = tabs?.at(0)?.key ?? '';
    const isTabExist = tabs?.some((tab) => tab?.key === tabName);

    const navigate = useNavigate();

    const handleTabClick = (activeKey: string) => {
        const isFirstKey = activeKey === firstTabKey;
        const redirectString = isFirstKey ? '' : `/${activeKey}`;

        onTabClick?.(activeKey);
        navigate(`${basePath}${redirectString}`);
    };

    if (!isTabExist && tabName) {
        return <Navigate to={basePath} replace={true} />;
    }

    return (
        <Tabs
            centered={true}
            className={styles.tabs}
            tabBarStyle={{ marginBottom: '24px', width: '368px' }}
            onTabClick={handleTabClick}
            activeKey={tabName ?? firstTabKey}
            items={tabs}
        />
    );
};
