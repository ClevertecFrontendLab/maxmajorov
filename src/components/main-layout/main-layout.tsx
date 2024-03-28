import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from '@components/require-auth';
import { AppFooter } from '@widgets/app-footer';
import { AppHeader } from '@widgets/app-header';
import { MobileSideBar } from '@widgets/mobile-side-bar';
import { SideBar } from '@widgets/side-bar';
import { Layout } from 'antd';
import classNames from 'classnames';

import styles from './main-layout.module.css';

const { Content } = Layout;

type MainLayoutProps = {
    isSimpleFooter?: boolean;
    isImage?: boolean;
    defaultBack?: boolean;
    withInnerBack?: boolean;
};

export const MainLayout: FC<MainLayoutProps> = ({
    isSimpleFooter,
    isImage = true,
    defaultBack,
    withInnerBack,
}) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleMenu = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <RequireAuth>
            <Layout
                className={classNames(isImage ? styles.appImage : styles.app, {
                    [styles.defaultBack]: defaultBack,
                })}
            >
                <SideBar toggleMenu={toggleMenu} collapsed={collapsed} />
                <MobileSideBar />
                <Layout
                    className={classNames(styles.appContent, {
                        [styles.appContentCollapsed]: collapsed,
                    })}
                >
                    <AppHeader />
                    <Content
                        className={classNames(styles.content, {
                            [styles.innerBack]: withInnerBack,
                        })}
                    >
                        <Outlet />
                    </Content>
                    {isSimpleFooter ? <div /> : <AppFooter />}
                </Layout>
            </Layout>
        </RequireAuth>
    );
};
