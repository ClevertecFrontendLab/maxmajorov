import { FC, ReactNode } from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';

import { DescriptionCardTextColor, DescriptionCardTextSize } from './types';

import styles from './description-card.module.css';

type DescriptionCardProps = {
    textSize?: DescriptionCardTextSize;
    textColor?: DescriptionCardTextColor;
    children?: ReactNode;
} & CardProps;

export const DescriptionCard: FC<DescriptionCardProps> = ({
    children,
    textSize = DescriptionCardTextSize.MEDIUM,
    textColor = DescriptionCardTextColor.DARK,
    ...otherProps
}) => (
    <Card {...otherProps}>
        <div
            className={classNames({
                [styles[textSize]]: true,
                [styles[textColor]]: true,
            })}
        >
            {children}
        </div>
    </Card>
);
