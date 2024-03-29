import { TrainingsMapping } from '@constants/training-types';
import { UserTrainingTransform } from '@redux/types/training.ts';

export const getFavouriteTraining = (trainings: UserTrainingTransform) => {
    const result: Record<string, number> = {};

    const allTrainigsList = Object.values(trainings).flat();

    allTrainigsList.forEach((obj) => {
        if (obj.exercises && obj.exercises.length > 0) {
            const key = obj.name;

            obj.exercises.forEach((exercise) => {
                const value = exercise.replays * exercise.weight * exercise.approaches;

                result[key] = value;
            });
        }
    });

    const [maxKey] = Object.entries(result).sort((a, b) => b[1] - a[1])[0];

    return TrainingsMapping[maxKey as keyof typeof TrainingsMapping];
};
