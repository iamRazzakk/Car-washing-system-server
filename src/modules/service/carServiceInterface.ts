export type ICarService = {
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted?: boolean;
}