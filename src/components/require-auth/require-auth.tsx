import { Navigate } from 'react-router-dom';
import { KEY } from '@components/result/constants/content';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import { accessTokenSelector } from '@redux/modules/app';
import { Paths } from '@routes/paths';

export const RequireAuth = ({ children }: { children: JSX.Element | React.ReactNode[] }) => {
    const token = useAppSelector(accessTokenSelector);
    const { from, location, lastPartUrl } = useLastPartUrl();

    const isFullUrl = lastPartUrl && Object.values(KEY).includes(lastPartUrl as KEY);
    const isCameFromAuth = from?.pathname.includes(Paths.AUTH);

    if (isFullUrl && isCameFromAuth) return children;

    return token ? (
        children
    ) : (
        <Navigate to={Paths.AUTH} state={{ from: location }} replace={true} />
    );
};
