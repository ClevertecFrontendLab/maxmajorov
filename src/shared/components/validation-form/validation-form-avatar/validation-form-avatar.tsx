import React, { useCallback, useContext, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ProfileFieldNames } from '@common-types/credentials';
import { ModalNotification } from '@components/modal-notification';
import { API_URL } from '@constants/general';
import { ModalNotificationTheme } from '@constants/modal-notification-theme';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ApiEndpoints } from '@redux/constants/api';
import { accessTokenSelector } from '@redux/modules/app';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, Form, Upload, UploadFile } from 'antd';
import { UploadFileStatus } from 'antd/lib/upload/interface';

import { DataTestIdProp, ValidationFormContext } from '../validation-form';

import styles from './validation-form-avatar.module.css';

export const ValidationFormAvatar = ({ dataTestId }: DataTestIdProp) => {
    const { form } = useContext(ValidationFormContext);
    const size = useWindowSize();

    const token = useAppSelector(accessTokenSelector);

    const url = form?.getFieldValue(ProfileFieldNames.avatar);

    const initialFile = {
        uid: '1',
        name: 'image.png',
        url,
    };

    const [fileList, setFileList] = useState<UploadFile[]>(url ? [initialFile] : []);
    const [isBigFile, setIsBigFile] = useState(false);

    const showPreview = !!fileList[0];
    const isDesktop = Number(size.width) > 360;
    const listType = isDesktop ? 'picture-card' : 'picture';

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);

        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialFile,
                    url: '',
                    name: newFile.name,
                    status: 'error' as UploadFileStatus,
                };

                setFileList([errorFile]);
            }

            if (newFile.error?.status === 409) {
                setIsBigFile(true);
            }
        }
    };

    const onCloseModal = useCallback(() => setIsBigFile(false), []);

    return (
        <React.Fragment>
            <ModalNotification
                textButton='Закрыть'
                onClickButton={onCloseModal}
                type='error'
                title='Файл слишком большой'
                subtitle='Выберите файл размером менее 5 МБ.'
                open={isBigFile}
                theme={ModalNotificationTheme.ONE_COLOR}
                dataTestId='big-file-error-close'
            />
            <Form.Item name={ProfileFieldNames.avatar} data-test-id={dataTestId}>
                <Upload
                    maxCount={1}
                    action={`${API_URL}/${ApiEndpoints.IMAGE}`}
                    headers={{ authorization: `Bearer ${token}` }}
                    listType={listType}
                    fileList={fileList}
                    accept='image/*'
                    onChange={handleChange}
                    progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                >
                    {!showPreview && <ValidationFormAvatar.UploadBtn isDesktop={isDesktop} />}
                </Upload>
            </Form.Item>
        </React.Fragment>
    );
};

ValidationFormAvatar.UploadBtn = ({ isDesktop }: { isDesktop: boolean }) =>
    isDesktop ? (
        <button className={styles.avatarBtn} type='button'>
            <PlusOutlined />
            <div className={styles.avatarBtnText}>Загрузить фото профиля</div>
        </button>
    ) : (
        <div className={styles.mobileBtn}>
            <span>Загрузить фото профиля:</span>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
        </div>
    );
