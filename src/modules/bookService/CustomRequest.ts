import { Request } from 'express';
import { TUserTokenPayload } from './bookService.constance';


export interface CustomRequest extends Request {
    user?: TUserTokenPayload;
}
