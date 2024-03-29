import { Moment } from 'moment/moment';

import { CardModalBody } from '../../../../constans/card-modal.ts';

export type TrainingDataCall = {
    date: Moment;
    openFlag: CardModalBody;
    name?: string;
};
