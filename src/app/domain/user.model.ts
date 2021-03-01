export enum identityType{
    IdCard = 0,
    DriverLicense,
}

export interface Address{
    province: string;
    city: string;
    street;
}

export interface Identity{
    identityNo: string;
    identityType: identityType;
}

export interface User{
    id?: string;
    email: string;
    passwoard: string;
    name: string;
    avatar: string;
    projectIds: string[];
    address?: Address;
    identity?: Identity;
    dateOfBirth?: string;
}