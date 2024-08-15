export type TCreateService = {
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted?: boolean;
};

export type TServiceResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
};
