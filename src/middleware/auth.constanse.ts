export type TUserTokenPayload = {
    _id: string;
    email: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
};
