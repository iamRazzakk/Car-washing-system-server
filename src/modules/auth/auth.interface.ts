export type TUserLogin = {
    email: string,
    password: string,
    refreshToke?:string
}
export type TChangePassoword = {
    email: string;
    oldPassword: string;
    newPassword: string;
}