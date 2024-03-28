import { Paths } from '@routes/paths.ts';
import exitIcon from '@shared/assets/icons/icon-exit.svg';
import topIcon from '@shared/assets/icons/icon-top.svg';

import { CardMenu } from '../../../constans/menu.ts';

type MenuItem = {
    id: number;
    title: string;
    icon: string;
    route: string;
    dataTestId: string;
};

const [item1, item2, profile] = CardMenu;

export const MENU_ITEMS: MenuItem[] = [
    { ...item2, dataTestId: 'sidebar-calendar' },
    { ...item1, dataTestId: 'sidebar-training' },
    {
        id: 3,
        title: 'Достижения',
        icon: topIcon,
        route: Paths.ACHIEVEMENTS,
        dataTestId: 'sidebar-achivements',
    },
    { ...profile, dataTestId: 'sidebar-profile' },
];

export const MENU_ITEM_EXIT: MenuItem = {
    id: 5,
    title: 'Выход',
    icon: exitIcon,
    route: '',
    dataTestId: 'sidebar-logout',
};
