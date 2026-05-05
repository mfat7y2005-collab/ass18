
import {  Model } from "mongoose";
import { IUser } from "../../common/interfaces";
import { BaseRepository } from "../../DB/repository/base.repository";
export class UserRepository extends BaseRepository <IUser>{
    constructor(protected override model:Model<IUser>){
        super(model)
    }
   
}