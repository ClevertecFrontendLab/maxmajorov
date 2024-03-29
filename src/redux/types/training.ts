import { Moment } from 'moment';

export type Training = { name: string };

export type Parameters = {
    repeat: boolean;
    period: number | null;
    jointTraining: boolean;
    participants: string[];
};

export type UserTrainingData = Training & {
    id?: string;
    date: string | Moment;
    isImplementation: boolean;
    parameters?: Parameters;
};

export type Exercises = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
};

export type UserTraining = UserTrainingData & {
    exercises: Exercises[];
};

export type UserTrainingTransform = Record<string, UserTraining[]>;
