import { UserTrainingTransform } from '@redux/types/training.ts';

export const findUserTraining = (
    userTraining: UserTrainingTransform,
    date: string,
    nameTraining?: string,
) => userTraining[date as string]?.filter((element) => element.name === nameTraining)[0] || [];
