
import { Empty } from 'antd';

import styles from './empty-element.module.css';

export const EmptyElement = () => (
    <div className={styles.empty}>
        <Empty image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg' />
    </div>
);
