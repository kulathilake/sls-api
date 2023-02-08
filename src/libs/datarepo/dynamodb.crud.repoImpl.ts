import { PageMeta, Page } from "../../common/common.types";
import { CRUDRepo } from "./crud.repo";
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from "@aws/dynamodb-data-mapper";

const LOCAL_DYNAMODB_ENDPOINT = process.env.LOCAL_DYNAMODB_ENDPOINT || 'http://localhost:8000';

export class DynamodbCRUD<T,C,U> implements CRUDRepo<T,C,U>{
    protected dynamodb: DynamoDB;
    protected mapper: DataMapper;
    protected partitionKey?: string;
    protected sortKey?: string;

    constructor(partitionKey?:string, sortKey?: string){
        const config = {};
        if(process.env.IS_OFFLINE) {
            (config as any).region = "localhost";
            (config as any).endpoint = LOCAL_DYNAMODB_ENDPOINT
        }
        
        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
        this.dynamodb  = new DynamoDB(config);

        this.mapper = new DataMapper({
            client: this.dynamodb
        })
    }

    create(create: C): Promise<T> {
        this.mapper.put({
            item: create
        }).then((d)=>{
            console.log(d);
        })

        return Promise.resolve({} as T);
    }
    update(data: U): Promise<T> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    findPageByQuery(query: Map<string, string>, page: PageMeta<T>): Promise<Page<T>> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async ensureTable(domainObj:any):Promise<any>{
        return await this.mapper.ensureTableExists(domainObj,{readCapacityUnits:5,writeCapacityUnits:5})
        .then(s=>console.log({d:s,foo:'bar'}))
        .catch(e=>console.log({e,"error":"error"}))
    }
    
}