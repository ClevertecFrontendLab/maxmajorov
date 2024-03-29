import { ProfileLayout } from '@components/profile-layout';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import Logo from '@public/logo.svg?react';

import styles from './login-profile-page.module.css';

export const LoginProfilePage = () => {
    const { lastPartUrl } = useLastPartUrl();
    const isHiddenLogo = lastPartUrl && ['confirm-email', 'change-password'].includes(lastPartUrl);

    return <ProfileLayout>{!isHiddenLogo && <Logo className={styles.logo} />}</ProfileLayout>;
};
