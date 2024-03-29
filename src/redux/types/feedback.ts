export type GetFeedbackRequestType = {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: Date;
    id: string;
};

export type CreateFeedbackRequestType = {
    message: string;
    rating: number;
};
