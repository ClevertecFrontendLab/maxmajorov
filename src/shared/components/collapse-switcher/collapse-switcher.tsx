import { ButtonHTMLAttributes, FC } from 'react';
import switcherCollapsedIcon from '@shared/assets/icons/icon-switcher-collapsed.svg';
import switcherExpandedIcon from '@shared/assets/icons/icon-switcher-expanded.svg';
import classNames from 'classnames';

import styles from './collapse-switcher.module.css';

type CollapseSwitcherProps = {
    collapsed: boolean;
    isDesktop: boolean;
    toggleMenu: () => void;
    dataTestId?: string;
    outerClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CollapseSwitcher: FC<CollapseSwitcherProps> = ({
    dataTestId,
    outerClass,
    collapsed,
    isDesktop,
    toggleMenu,
    ...otherProps
}) => (
    <button
        data-test-id={dataTestId}
        className={classNames(
            styles.collapseSwitcher,
            outerClass,
            isDesktop ? styles.desktopSwitcher : styles.mobileSwitcher,
        )}
        type='button'
        onClick={toggleMenu}
        {...otherProps}
    >
        <img
            src={collapsed ? switcherCollapsedIcon : switcherExpandedIcon}
            alt='Выход'
            className={classNames(
                styles.switcherIcon,
                isDesktop ? styles.desktopIcon : styles.mobileIcon,
            )}
        />
    </button>
);
