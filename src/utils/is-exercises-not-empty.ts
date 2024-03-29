import { Exercises } from '@redux/types/training.ts';

export const isExercisesNotEmpty = (exercises: Exercises[]) =>
    exercises.filter(({ name }) => Boolean(name)).length;
