import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { jointTrainingListSelector } from '@redux/modules/invite';
import { useRemoveJointTrainingMutation } from '@redux/serviсes/invite';
import { sortTrainingList } from '@utils/sort-training-list';
import { Button, Input, List } from 'antd';
import { Nullable } from 'src/types/nullable';

import { DATA_TEST_ID } from '../../../../../constans/data-test-id';
import { UserCard } from '../user-card';

import styles from './joint-training-list.module.css';

const { Search } = Input;

type ListProps = {
    goBack: () => void;
};

export const JointTrainingList: React.FC<ListProps> = ({ goBack }) => {
    const [searchValue, setSearchValue] = useState('');

    const jointTrainingList = useAppSelector(jointTrainingListSelector);

    const [removeJointTrainingMutation] = useRemoveJointTrainingMutation();

    const filteredTrainingList = sortTrainingList(jointTrainingList).filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const backButtonHandler = () => {
        goBack();
    };

    const searchHandler = (value: string) => {
        setSearchValue(value);
    };

    const rejectJointTrainigHandler = (inviteId: Nullable<string>) => {
        removeJointTrainingMutation({ inviteId });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.searhing}>
                <Button
                    onClick={backButtonHandler}
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    className={styles.backButton}
                >
                    Назад
                </Button>
                <Search
                    data-test-id={DATA_TEST_ID.searchInput}
                    placeholder='Поиск по имени'
                    onSearch={searchHandler}
                    className={styles.searhInput}
                />
            </div>
            <List
                dataSource={filteredTrainingList}
                renderItem={(partner, index) => (
                    <UserCard
                        partner={partner}
                        onRejectJointTraining={rejectJointTrainigHandler}
                        screen='joint-list'
                        searchFilter={searchValue}
                        index={index}
                    />
                )}
                pagination={
                    jointTrainingList.length > 12 && {
                        pageSize: 12,
                        size: 'small',
                    }
                }
            />
        </div>
    );
};
