import moment, { Moment } from 'moment';

export const FORMAT_D_M_Y_POINT = 'DD.MM.YYYY';

export const FORMAT_Y_M_D = 'YYYY-MM-DD';

export const formatDate = (date: Moment | string, format = FORMAT_D_M_Y_POINT) =>
    moment(date).format(format);

export const isOldDate = (date?: Moment | string) =>
    Boolean(date && moment(date).isBefore(moment()));
