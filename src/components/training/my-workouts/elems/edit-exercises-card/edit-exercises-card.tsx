import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserTraining } from '@redux/types/training.ts';
import { getColorStatus } from '@utils/get-color-status';
import { Button, Card, Typography } from 'antd';

import styles from './edit-exercises-card.module.css';

type CardProps = {
    selectedTraining: UserTraining;
    onClose: VoidFunction;
    onEditExercises: (training: UserTraining) => void;
};

export const EditExercisesCard: React.FC<CardProps> = ({
    selectedTraining,
    onClose,
    onEditExercises,
}) => {
    const editExercisesHandel = () => {
        onEditExercises(selectedTraining)
    };

    return (
        <Card
            className={styles.editCard}
            actions={[
                <Button block={true} size='middle' type='ghost' onClick={editExercisesHandel}>
                    Добавить упражнения
                </Button>,
            ]}
        >
            <div>
                <div className={styles.cardTitle} style={{borderBottom: `2px solid ${getColorStatus()}`}}>
                    <Button
                        type='text'
                        size='small'
                        icon={<ArrowLeftOutlined />}
                        onClick={onClose}
                    />
                    <div>{selectedTraining?.name}</div>
                </div>
                <div className={styles.cardBody}>
                    {selectedTraining?.exercises?.map(({ name }) => (
                        <Typography.Text type='secondary' className={styles.items}>
                            {name}
                        </Typography.Text>
                    ))}
                </div>
            </div>
        </Card>
    );
};
