export type TErrorMessages = {
    path: string | number;
    message: string;
}[];

export interface IErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: TErrorMessages;
}
