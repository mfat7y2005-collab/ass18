import { GenderEnum, RoleEnum } from "../enums";
export interface IUser {
    firstName:string;
    lastName:string;
    username?:string;
    slug:string;
    email:string;
    password:string;
    bio?:string;
    phone?:string;
    profileImage:string;
    coverImage:string[];
    DOB?:Date;
    confirmedAt?:Date;
    gender:GenderEnum;
    role:RoleEnum;
    createdAt:Date;
    updatedAt?:Date;
    confirmEmail:Date;
    resendConfirmEmail:Date;
    provider:number;
     extra:{name:String};
     deletedAt?:Date;
     restoredAt?:Date;

}