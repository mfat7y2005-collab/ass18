
import { AnyKeys, CreateOptions, FlattenMaps, HydratedDocument, Model, ProjectionType, QueryFilter, QueryOptions} from "mongoose";
import { IUser } from "../../common/interfaces";

export abstract class BaseRepository <TRawDocument>{
    constructor(protected model:Model<TRawDocument>){}
    async create({
        data,options}:{data:AnyKeys<TRawDocument>[],options?:CreateOptions|undefined}):Promise<HydratedDocument<TRawDocument>[]>{
         return  await this.model.create(data as any,options);
    }

     async insertMany({
        data}:{data:AnyKeys<TRawDocument>[]}):Promise<HydratedDocument<TRawDocument>[]>{
         return  await this.model.insertMany(data as any) as HydratedDocument<TRawDocument>[]
    }
    
    
     async createone({
        data,options}:{data:AnyKeys<TRawDocument>,options?:CreateOptions|undefined}):Promise<HydratedDocument<TRawDocument>[]>{
         const[doc] = await this.create({data: [data],options}) || [];
         return [doc] as HydratedDocument<TRawDocument>[];
    }


    async updateOne({
  filter,
  update,
  options,
}: {
  filter: QueryFilter<TRawDocument>;
  update: Partial<TRawDocument>;
  options?: QueryOptions;
}): Promise<HydratedDocument<TRawDocument> | null> {
  return await this.model.findOneAndUpdate(filter, update as any, {
    new: true,
    ...options,
  });
}
async findOneAndUpdate({
  filter,
  update,
  options,
}: {
  filter: QueryFilter<TRawDocument>;
  update: Partial<TRawDocument>;
  options?: QueryOptions;
}): Promise<HydratedDocument<TRawDocument> | null> {
  return await this.model.findOneAndUpdate(
    filter,
    update as any,
    {
      new: true, // يرجّع الدوكيومنت بعد التحديث
      ...options,
    }
  );
}
async deleteOne({
  filter,
}: {
  filter: QueryFilter<TRawDocument>;
}): Promise<boolean> {
  const result = await this.model.deleteOne(filter);
  return result.deletedCount === 1;
}
async findOneAndDelete({
  filter,
  options,
}: {
  filter: QueryFilter<TRawDocument>;
  options?: QueryOptions;
}): Promise<HydratedDocument<TRawDocument> | null> {
  return await this.model.findOneAndDelete(filter, options);
}



    //---------------------OverLaoding---------------------------------------
    //sigle document😊
    /*   async create({
        data,
        }:{data:AnyKeys<TRawDocument>
        }):Promise<HydratedDocument<TRawDocument>>{
        
    } */
   /*
   //array of documents 😒
      async create({
        data,
        options}:{data:AnyKeys<TRawDocument>[],
        options?:CreateOptions|undefined
        }):Promise<HydratedDocument<TRawDocument>[]>{
       
    }
   
   */
  /*
  //implementation 😍
     async create({
        data,
        options
        }:{
        data:AnyKeys<TRawDocument>|AnyKeys<TRawDocument>[],
        options?:CreateOptions|undefined
        }):Promise<HydratedDocument<TRawDocument>[]>|HydratedDocument<TRawDocument>>{
         return  await this.model.create(data as any,options);
    }
  */
 //-----------------------------------------------------------------------------




 //---------------------Find----------------------------------------------------
 //overloading for findOne method
 //lean false or not provided => return hydrated document
 async findOne({
        filter,
        projection,
        options

 }:{
     filter?: QueryFilter<TRawDocument>,
          projection?: ProjectionType<TRawDocument> | null | undefined,
          options?: QueryOptions<TRawDocument>&{lean: false} |
          null | undefined
 }

    
 ):Promise<HydratedDocument<IUser>>

//lean true => return plain js object
  async findOne({
        filter,
        projection,
        options

 }:{
     filter?: QueryFilter<TRawDocument>,
          projection?: ProjectionType<TRawDocument>| null | undefined,
          options?: QueryOptions<TRawDocument>&{lean: true} |
          null | undefined
 }

    
 ):Promise<null|FlattenMaps<IUser>>
  
 //lean not provided => return hydrated document


  async findOne({
        filter,
        projection,
        options

 }:{
     filter?: QueryFilter<TRawDocument>,
          projection?: ProjectionType<TRawDocument> | null | undefined,
          options?: QueryOptions<TRawDocument> |
          null | undefined
 }

    
 ):Promise<any>{
     const doc= this.model.findOne(filter,projection);
        if(options?.lean)doc.lean(options.lean);
        return await doc.exec() 
 }
}