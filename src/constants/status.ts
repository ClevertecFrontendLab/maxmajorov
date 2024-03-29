export enum STATUS {
    'accepted' = 'запрос одобрен',
    'pending' = 'ожидает подтверждения',
    'rejected' = 'запрос отклонен'
}

export const Status: Record<string, string> = {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    REJECTED: 'rejected'
}