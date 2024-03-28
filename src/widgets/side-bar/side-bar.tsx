import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { clearStateOnLogout } from '@redux/modules/app';
import { inviteListSelector } from '@redux/modules/invite';
import { apiSlice } from '@redux/serviсes';
import { useLazyGetUserTrainingQuery } from '@redux/serviсes/training.ts';
import { Paths, RoutNamePage } from '@routes/paths.ts';
import logoCollapsed from '@shared/assets/icons/logo-collapsed.svg';
import logoFull from '@shared/assets/icons/logo-full.svg';
import { CollapseSwitcher } from '@shared/components/collapse-switcher';
import { navigateAfterRequest } from '@utils/navigate-after-request.ts';
import { Badge, Button, Divider, Layout } from 'antd';
import classNames from 'classnames';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import { MENU_ITEM_EXIT, MENU_ITEMS } from './config/menu-items';

import styles from './side-bar.module.css';

const { Sider } = Layout;

type SideBarProps = {
    collapsed: boolean;
    toggleMenu: () => void;
};

export const SideBar: FC<SideBarProps> = ({ collapsed, toggleMenu }) => {
    const inviteList = useAppSelector(inviteListSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getUserTraining, { isError }] = useLazyGetUserTrainingQuery();

    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        dispatch(clearStateOnLogout());
        dispatch(apiSlice.util.resetApiState());
    }, [dispatch]);

    const onNavigate = async (route: string) => {
        await navigateAfterRequest(
            navigate,
            getUserTraining,
            [`${Paths.AUTH}${Paths.CALENDAR}`, `${Paths.AUTH}${Paths.TRAINING}`],
            route,
        );
    };

    return (
        <Sider
            className={styles.sideBar}
            collapsible={true}
            trigger={null}
            collapsed={collapsed}
            collapsedWidth='64px'
            width='208px'
        >
            <div
                className={classNames(styles.upperBlock, {
                    [styles.upperBlockCollapsed]: collapsed,
                })}
            >
                <div className={styles.imageContainer}>
                    <img
                        alt='CleverFit'
                        src={collapsed ? logoCollapsed : logoFull}
                        className={styles.logo}
                    />
                </div>
                {MENU_ITEMS.map(({ id, icon, title, route, dataTestId }) => (
                    <Button
                        type='text'
                        key={id}
                        className={styles.menuButton}
                        data-test-id={dataTestId}
                        onClick={() => onNavigate(route)}
                    >
                        {route === `/${RoutNamePage.TRAINING}` ? (
                            <Badge
                                data-test-id={DATA_TEST_ID.notificationAboutJointTraining}
                                count={inviteList.length}
                                style={{ margin: '0' }}
                            >
                                <img alt='icon' src={icon} />
                            </Badge>
                        ) : (
                            <img alt='icon' src={icon} />
                        )}

                        {!collapsed && <span>{title}</span>}
                    </Button>
                ))}
            </div>
            <div>
                <Divider className={styles.divider} />
                <Button
                    type='text'
                    className={classNames(styles.menuButton, styles.exitButton, {
                        [styles.collapsedButton]: collapsed,
                    })}
                    onClick={logout}
                >
                    <img alt='icon' src={MENU_ITEM_EXIT.icon} />
                    {!collapsed && <span>{MENU_ITEM_EXIT.title}</span>}
                </Button>
            </div>
            <CollapseSwitcher
                dataTestId='sider-switch'
                outerClass={styles.switcherPosition}
                collapsed={collapsed}
                toggleMenu={toggleMenu}
                isDesktop={true}
            />
            <ModalNoReview open={isError} />
        </Sider>
    );
};
