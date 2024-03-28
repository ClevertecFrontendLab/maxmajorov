/* eslint-disable import/no-extraneous-dependencies */
import Lottie from 'react-lottie';

import loader from '../assets/loader.json';

import styles from './custom-loader.module.css';

export const CustomLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    };

    return (
        <div className={styles.loader}>
            <Lottie options={defaultOptions} />
        </div>
    );
};
