import React from 'react';
import { RoutNamePage } from '@routes/paths.ts';

export const appHeader = {
    [RoutNamePage.MAIN]: {
        title: <React.Fragment>
            риветствуем тебя в CleverFit — приложении,
            <br />
            которое поможет тебе добиться своей мечты!
            </React.Fragment>,
        namePage: 'Главная'
    },
    [RoutNamePage.CALENDAR] : {
        title: '',
        namePage: 'Календарь'
    },
    [RoutNamePage.TRAINING] : {
        title: '',
        namePage: 'Тренеровки'
    },
}
