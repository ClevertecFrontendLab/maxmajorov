import { createContext, ReactNode, useMemo, useState } from 'react';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { ProfileCredential } from '@redux/modules/profile';
import { Form, FormInstance } from 'antd';
import { FormProps } from 'antd/es/form';

type ValidationFormProps = {
    children?: ReactNode;
    className?: string;
    form: FormInstance;
} & FormProps;

type AuthForm = Partial<ReturnType<typeof useAuthForm>>;
type ErrorValidate = Partial<Record<keyof CredentialsType, boolean>>;
export type DataTestIdProp = { dataTestId?: string };

export const ValidationFormContext = createContext(
    {} as AuthForm & {
        errorValidate: ErrorValidate;
        isTouched: boolean;
    },
);

export const ValidationForm = ({
    children,
    className,
    size,
    initialValues,
    form,
    onFinish,
}: ValidationFormProps) => {
    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const [isTouched, setIsTouched] = useState(false);

    const onFieldsChange = (values: any) => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        if (values[0].name[0] === 'imgSrc' && values[0].value?.file.error) setIsTouched(false);
        else setIsTouched(true);

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const handleSubmit = (credentials: ProfileCredential) => {
        onFinish?.(credentials);
        setIsTouched(false);
        form.setFieldValue(AuthFieldNames.password, '');
        form.setFieldValue(AuthFieldNames.confirmPassword, '');
    };

    const memoizedContextValue = useMemo(
        () => ({
            form,
            errorValidate,
            isTouched,
        }),
        [form, errorValidate, isTouched],
    );

    return (
        <ValidationFormContext.Provider value={memoizedContextValue}>
            <Form
                name='validateOnly'
                className={className}
                initialValues={initialValues}
                form={form}
                onFinish={handleSubmit}
                requiredMark={false}
                onFieldsChange={onFieldsChange}
                scrollToFirstError={true}
                size={size}
            >
                {children}
            </Form>
        </ValidationFormContext.Provider>
    );
};
