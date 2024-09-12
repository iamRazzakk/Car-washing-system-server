export type TUserTokenPayload = {
    _id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    iat: number;
    exp: number;
};
