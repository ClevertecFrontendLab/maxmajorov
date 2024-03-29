import { ProfileTabs } from '@components/profile-tabs';
import { tabs } from '@pages/login-profile-page/constants/tabs';
import { Paths } from '@routes/paths';

export const LoginProfileTabs = () => <ProfileTabs tabs={tabs} basePath={Paths.LOGIN} />;
