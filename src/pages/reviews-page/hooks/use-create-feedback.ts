import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CredentialsFeedbackType } from '@common-types/credentials';
import { setAppCredentialFeedback } from '@redux/modules/app';
import { useCreateFeedbackMutation } from '@redux/serviсes/feedback';
import { Form } from 'antd';

export const useCreateFeedback = () => {
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [formNewReview] = Form.useForm();
    const dispatch = useDispatch();

    const [createFeedback, { isError: isErrorFeedback, isSuccess: isSuccessFeedback }] =
        useCreateFeedbackMutation();

    const onFinish = useCallback(
        (credentials: CredentialsFeedbackType) => {
            const { rating, message } = { ...credentials };

            if (rating !== 0) {
                createFeedback({ rating, message });
            }
            dispatch(setAppCredentialFeedback(credentials));
        },
        [createFeedback, dispatch],
    );

    useEffect(() => {
        if (isSuccessFeedback) {
            setOpenSuccessModal(true);
        }
    }, [isSuccessFeedback]);

    useEffect(() => {
        if (isErrorFeedback) {
            setOpenErrorModal(true);
        }
    }, [isErrorFeedback]);

    return {
        onFinish,
        formNewReview,
        openErrorModal,
        setOpenErrorModal,
        openSuccessModal,
        setOpenSuccessModal,
    };
};
