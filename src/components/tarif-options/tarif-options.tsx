import { InfoCircleOutlined } from '@ant-design/icons';
import { ProfileFieldNames } from '@common-types/credentials';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { profileCredentialSelector } from '@redux/modules/profile';
import { useUpdateUserMutation } from '@redux/serviсes/profile';
import { useWindowSize } from '@uidotdev/usehooks';
import { Form, FormProps, Switch, Tooltip } from 'antd';
import classNames from 'classnames';

import styles from './tarif-options.module.css';

const Options = [
    {
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: ProfileFieldNames.trainings,
        dataTestId: 'tariff-trainings',
        dataTestIdIcon: 'tariff-trainings-icon',
    },
    {
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: ProfileFieldNames.notifications,
        dataTestId: 'tariff-notifications',
        dataTestIdIcon: 'tariff-notifications-icon',
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        forPro: true,
        dataTestId: 'tariff-theme',
        dataTestIdIcon: 'tariff-theme-icon',
    },
];

export const TarifOptions = () => {
    const size = useWindowSize();
    const credentials = useAppSelector(profileCredentialSelector);
    const [updateUser] = useUpdateUserMutation();

    const isProUser = credentials.tariff;
    const isDesktop = Number(size.width) > 360;
    const switchSize = isDesktop ? 'default' : 'small';
    const tooltipPlacement = isDesktop ? 'bottom' : 'top';

    const handleChange: FormProps['onFieldsChange'] = (fields) => {
        const { name: names, value } = fields[0];
        const name = names[0];

        updateUser({ [name]: value });
    };

    return (
        <Form className={styles.options} initialValues={credentials} onFieldsChange={handleChange}>
            {Options.map(({ title, tooltip, forPro, name, dataTestId, dataTestIdIcon }) => {
                const hidePro = !isProUser && forPro;

                return (
                    <div className={styles.option} key={title}>
                        <div
                            className={classNames(styles.title, {
                                [styles.inactive]: hidePro,
                            })}
                        >
                            <span className={styles.optionTitle}>{title}</span>
                            <Tooltip title={tooltip} placement={tooltipPlacement}>
                                <InfoCircleOutlined
                                    data-test-id={dataTestIdIcon}
                                    className={styles.icon}
                                />
                            </Tooltip>
                        </div>
                        <Form.Item
                            name={name}
                            key={title}
                            valuePropName='checked'
                            className={styles.option}
                        >
                            <Switch
                                disabled={hidePro}
                                size={switchSize}
                                data-test-id={dataTestId}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};
