import { Moment } from 'moment';

type AttachPortalProps = {
    date: Moment | string; 
};

const PORTAL_ID = 'portal';

export const CALENDAR_ID = 'calendarId';

export const attachPortal = ({ date }: AttachPortalProps) => {
    const targetElements = document.querySelectorAll<any>(`[title*="${date}"]`);

    if (targetElements[0]?.id !== PORTAL_ID) {
        targetElements[0].style.position = 'relative';
        targetElements[0].id = PORTAL_ID;
    }

    return targetElements[0];
};

let isOpenCard = true;

export const changeCardEvent = (event: boolean) => {
    isOpenCard = event;
};

export const attachPortalMobile = ({ date }: AttachPortalProps) => {
    if (!isOpenCard) {
        return { element: null, offsetTop: 0 };
    }

    const targetElement = document.getElementById(CALENDAR_ID);

    if (targetElement && targetElement?.id !== PORTAL_ID) {
        targetElement.style.position = 'relative';
    }

    const elements = document.querySelectorAll<any>(`[title*="${date}"]`);

    return {
        element: targetElement,
        offsetTop: Number(elements[0]?.offsetTop) + 30,
    };
};
