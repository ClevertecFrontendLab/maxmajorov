import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Rate } from 'antd';

import styles from './review-card.module.scss';

type ReviewCardProps = {
    fullName: string | undefined;
    imageSrc: string | undefined;
    message: string | undefined;
    rating: number | undefined;
    createdAt: Date | undefined;
};

export const ReviewCard = ({ fullName, imageSrc, message, rating, createdAt }: ReviewCardProps) => {
    const [name, surName] = fullName?.split(' ') ?? [];
    const date = createdAt && new Date(createdAt).toLocaleDateString();

    return (
        <Card className={styles.reviewCardWrap} bordered={false}>
            <div className={styles.reviewCard}>
                <div className={styles.profileInfo}>
                    <Avatar size={42} src={imageSrc} icon={<UserOutlined />} />
                    <div>
                        <h6 className={styles.profileName}>{name || 'Имя'}</h6>
                        <h6 className={styles.profileSurName}>{surName || 'Фамилия'}</h6>
                    </div>
                </div>
                <div className={styles.descriptionBlock}>
                    <div className={styles.ratingDate}>
                        <Rate
                            style={{ color: '#faad14' }}
                            className={styles.rate}
                            disabled={true}
                            defaultValue={rating}
                        />
                        <span className={styles.date}>{date}</span>
                    </div>
                    <div className={styles.description}>{message}</div>
                </div>
            </div>
        </Card>
    );
};
