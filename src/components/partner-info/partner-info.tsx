import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BadgeChanged } from '@components/badge-changed/badge-changed';
import { UserJointTrainigList } from '@redux/types/invite';
import { Avatar } from 'antd';
import moment from 'moment';

import styles from './partner-info.module.css';

type PartnerInfoProps = {
    partner: UserJointTrainigList;
};

export const PartnerInfo: React.FC<PartnerInfoProps> = ({ partner }) => (
        <div className={styles.partnerInfo}>
            <div className={styles.partnerAvatar}>
                <Avatar
                    size={42}
                    alt={partner.name}
                    src={partner.imageSrc}
                    icon={!partner.imageSrc && <UserOutlined />}
                />
                <div style={{ width: '50px', marginLeft: '8px' }}>{partner.name}</div>
            </div>
            <BadgeChanged
                isStatus={true}
                isEdit={false}
                text={partner.trainingType}
                date={moment(new Date())}
            />
        </div>
    );
