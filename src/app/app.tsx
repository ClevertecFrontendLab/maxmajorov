/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Loader } from '@components/loader';
import { history, store } from '@redux/configure-store';
import { routes } from '@routes/routes';
import { AppAlert } from '@shared/components/app-alert';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/en_GB';
import moment from 'moment';

import 'moment/locale/en-gb';

moment.locale('en-gb', {
    week: {
        dow: 1,
    },
});

export const App = () => (
    <ConfigProvider locale={locale}>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            <Loader />
            <AppAlert />
        </Provider>
    </ConfigProvider>
);
