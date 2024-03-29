import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalNoReview } from '@components/modal-no-reviews';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileCredentialSelector } from '@redux/modules/profile.ts';
import { useGetInviteListQuery } from '@redux/serviсes/invite.ts';
import { useLazyGetUserQuery } from '@redux/serviсes/profile.ts';
import { useLazyGetUserTrainingQuery } from '@redux/serviсes/training.ts';
import { Paths } from '@routes/paths.ts';
import {
    DescriptionCard,
    DescriptionCardTextColor,
    DescriptionCardTextSize,
} from '@shared/components/description-card';
import { navigateAfterRequest } from '@utils/navigate-after-request.ts';
import { Button, Card } from 'antd';

import { CardMenu } from '../../constans/menu.ts';

import styles from './main-page.module.css';

const cardHeadStyle = {
    display: 'flex',
    justifyContent: 'center',
    font: 'var(--font-m)',
    padding: '12px 24px',
};

const cardBodyStyle = {
    height: '42px',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const MainPage = () => {
    const navigate = useNavigate();
    const [getUserTraining, { isError }] = useLazyGetUserTrainingQuery();
    const [getUser] = useLazyGetUserQuery();
    const credential = useAppSelector(profileCredentialSelector);

    const onNavigate = (route: string) => {
         navigateAfterRequest(
            navigate,
            getUserTraining,
            [`${Paths.AUTH}${Paths.CALENDAR}`, `${Paths.AUTH}${Paths.TRAINING}`],
            route,
        );
    };

    useEffect(() => {
        if (!credential.email) getUser();
    }, [credential.email, getUser]);

    useGetInviteListQuery();

    return (
        <div className={styles.cardBlock}>
            <DescriptionCard
                textSize={DescriptionCardTextSize.MEDIUM}
                textColor={DescriptionCardTextColor.BLUE}
                className={styles.margin24px}
            >
                С CleverFit ты сможешь:
                <ul className={styles.descriptionList}>
                    <li>
                        — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                    </li>
                    <li>
                        — отслеживать свои достижения в разделе статистики, сравнивая свои
                        результаты с нормами и рекордами;
                    </li>
                    <li>
                        — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                        о тренировках;
                    </li>
                    <li>
                        — выполнять расписанные тренировки для разных частей тела, следуя подробным
                        инструкциям и советам профессиональных тренеров.
                    </li>
                </ul>
            </DescriptionCard>

            <DescriptionCard
                textSize={DescriptionCardTextSize.LARGE}
                textColor={DescriptionCardTextColor.DARK}
                className={styles.margin16px}
            >
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </DescriptionCard>

            <div className={styles.actionCardsBlocks}>
                {CardMenu.map(({ route, name, cardTitle, icon, id, dataTestId }) => (
                    <Card
                        title={cardTitle}
                        bordered={false}
                        className={styles.fullWidth}
                        headStyle={cardHeadStyle}
                        bodyStyle={cardBodyStyle}
                        key={id}
                    >
                        <Button
                            data-test-id={dataTestId}
                            type='text'
                            className={styles.cardButton}
                            onClick={() => onNavigate(route)}
                        >
                            <img alt='android' src={icon} />
                            <span>{name}</span>
                        </Button>
                    </Card>
                ))}
            </div>
            <ModalNoReview open={isError} />
        </div>
    );
};
