import { ProfileLayout } from '@components/profile-layout';
import { RequireAuth } from '@components/require-auth';

export const ResultProfilePage = () => (
    <RequireAuth>
        <ProfileLayout />
    </RequireAuth>
);
