export type TErrorSources = {
    path: string | number;
    message: string;
  }[];

export interface IErrorResponse {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
}