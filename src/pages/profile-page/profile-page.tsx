import { useCallback, useEffect, useState } from 'react';
import { ProfileFieldNames } from '@common-types/credentials';
import { ModalNotification } from '@components/modal-notification';
import { RequireAuth } from '@components/require-auth';
import { ModalNotificationTheme } from '@constants/modal-notification-theme';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    ProfileAvatar,
    ProfileCredential,
    profileCredentialSelector,
} from '@redux/modules/profile';
import { useUpdateUserMutation } from '@redux/serviсes/profile';
import {
    ValidateFormSubmit,
    ValidationForm,
    ValidationFormAvatar,
    ValidationFormBirthday,
    ValidationFormEmail,
    ValidationFormName,
    ValidationFormPassword,
    ValidationFormRepeatPassword,
    ValidationFormSurname,
} from '@shared/components/validation-form';
import { Form, Typography } from 'antd';
import moment from 'moment';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const credential = useAppSelector(profileCredentialSelector);

    const [form] = Form.useForm();
    const [updateUser, { isError }] = useUpdateUserMutation();
    const [showModal, setShowModal] = useState(isError);

    const initialValues = {
        ...credential,
        [ProfileFieldNames.birthday]: credential.birthday && moment(credential.birthday),
    };

    useEffect(() => {
        if (isError) setShowModal(true);
    }, [isError]);

    const onFinish = useCallback(
        ({ firstName, lastName, birthday, email, imgSrc, password }: ProfileCredential) => {
            const newUserData: Partial<ProfileCredential> = {
                firstName,
                lastName,
                birthday,
                email,
            };

            if (password) newUserData.password = password;
            if (imgSrc) {
                if (typeof imgSrc === 'string') newUserData.imgSrc = imgSrc;
                else if ((imgSrc as ProfileAvatar).file?.status === 'removed')
                    newUserData.imgSrc = '';
                else {
                    newUserData.imgSrc = `https://training-api.clevertec.ru${
                        (imgSrc as ProfileAvatar).file?.response?.url
                    }`;
                }
            }

            updateUser(newUserData);
        },
        [updateUser],
    );

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <RequireAuth>
            <ModalNotification
                textButton='Закрыть'
                onClickButton={handleCloseModal}
                type='error'
                title='При сохранении данных произошла ошибка '
                subtitle='Придётся попробовать ещё раз'
                open={showModal}
                theme={ModalNotificationTheme.ONE_COLOR}
                dataTestId='profile-error-button'
            />
            <div className={styles.back}>
                <ValidationForm
                    className={styles.form}
                    size='large'
                    initialValues={initialValues}
                    form={form}
                    onFinish={onFinish}
                >
                    <fieldset>
                        <legend>
                            <Typography.Title className={styles.title} level={5}>
                                Личная информация
                            </Typography.Title>
                            <div className={styles.group}>
                                <ValidationFormAvatar dataTestId='profile-avatar' />
                                <div className={styles.groupFields}>
                                    <ValidationFormName dataTestId='profile-name' />
                                    <ValidationFormSurname dataTestId='profile-surname' />
                                    <ValidationFormBirthday dataTestId='profile-birthday' />
                                </div>
                            </div>
                        </legend>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <Typography.Title className={styles.title} level={5}>
                                Приватность и авторизация
                            </Typography.Title>
                        </legend>
                        <ValidationFormEmail dataTestId='profile-email' />
                        <ValidationFormPassword withExtra={true} dataTestId='profile-password' />
                        <ValidationFormRepeatPassword dataTestId='profile-repeat-password' />
                        <ValidateFormSubmit dataTestId='profile-submit'>
                            Сохранить изменения
                        </ValidateFormSubmit>
                    </fieldset>
                </ValidationForm>
            </div>
        </RequireAuth>
    );
};
