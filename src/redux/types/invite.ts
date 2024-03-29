import { Nullable } from 'src/types/nullable';

import { Exercises, UserTraining } from './training';

export type UserJointTrainigList = {
    id: string;
    name: string;
    imageSrc: string;
    trainingType: string;
    avgWeightInWeek: number;
    status: Nullable<string>;
    inviteId: Nullable<string>;
};

export type JointTraining = UserTraining &
    Array<Exercises & { _id: string; isImplementation: boolean }>;

export type Invite = {
    _id: string;
    from: {
        _id: string;
        firstName: string;
        lastName: string;
        imageSrc: string;
    };
    training: JointTraining;
    status: string;
    createdAt: string;
};

export type SendInviteRequest = {
    to: string; // userId
    trainingId: string;
};

export type SendAnswerInviteRequest = {
    id: string;
    status: string;
};
