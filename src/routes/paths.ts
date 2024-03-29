export enum RoutNamePage {
    MAIN = 'main',
    CALENDAR = 'calendar',
    TRAINING = 'training',
}

export enum SidebarPath {
    MAIN = `/${RoutNamePage.MAIN}`,
}
export const Paths = {
    AUTH: '/',
    LOGIN: '/auth',
    RECOVERY: '/recovery',
    RESULT: '/result',
    REGISTRATION: '/auth/registration',
    REVIEWS: '/feedbacks',
    CONFIRM_EMAIL: 'confirm-email',
    CHANGE_PASSWORD: 'change-password',
    ERROR_409: 'error-user-exist',
    ERROR: 'error',
    SUCCESS: 'success',
    ERROR_LOGIN: 'error-login',
    ERROR_CHANGE_PASSWORD: 'error-change-password',
    SUCCESS_CHANGE_PASSWORD: 'success-change-password',
    ERROR_CHECK_EMAIL_NO_EXIST: 'error-check-email-no-exist',
    ERROR_CHECK_EMAIL: 'error-check-email',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    ACHIEVEMENTS: 'achievements',
    ...RoutNamePage,
    ...SidebarPath,
} as const;
