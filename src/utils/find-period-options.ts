export type PeriodOptions = {
    item: string;
    period: number;
};

export const options: PeriodOptions[] = [
    { item: 'Через 1 день', period: 1 },
    { item: 'Через 2 дня', period: 2 },
    { item: 'Через 3 дня', period: 3 },
    { item: 'Через 4 дня', period: 4 },
    { item: 'Через 5 дней', period: 5 },
    { item: 'Через 6 дней', period: 6 },
    { item: '1 раз в неделю', period: 7 },
];

export const getPeriodItems = () => options.map((option) => option.item);

export const getPeriodByItem = (item: string): number | null => {
    const foundOption = options.find((option) => option.item === item);

    return foundOption ? foundOption.period : null;
};

export const getKeyByPeriod = (period: number | null | undefined): string => {
    const foundOption = options.find((option) => option.period === period);

    return foundOption ? foundOption.item : '';
};
