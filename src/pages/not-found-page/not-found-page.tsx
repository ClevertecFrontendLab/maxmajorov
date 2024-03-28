import { useNavigate } from 'react-router-dom';
import { Exception } from '@components/exception';
import { Paths } from '@routes/paths';
import { Button } from 'antd';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoToMainPage = () => {
        navigate(Paths.MAIN);
    };

    return (
        <Exception
            status='404'
            title='Такой страницы нет'
            subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
            extra={
                <Button type='primary' onClick={handleGoToMainPage}>
                    На главную
                </Button>
            }
        />
    );
};
