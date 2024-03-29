import { useLocation } from 'react-router-dom';
import { LocationStateType } from '@common-types/location';

export const useLastPartUrl = () => {
    const location = useLocation();
    const state = location.state as LocationStateType;
    const lastPartUrl = location.pathname.split('/').at(-1);
    const { from } = state ?? {};

    return { lastPartUrl, from, location };
};
