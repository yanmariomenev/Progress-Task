export interface IUser {
    users: User[];
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    ip_address: string;
    country: string;
    avatar: string;
    currency: string;
    amount: number;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}
