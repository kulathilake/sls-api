import { PageMeta, Page } from "../common.types";
import { CRUDRepo } from "./crud.repo";
import Client from '@aws-sdk/client-dynamodb';

const LOCAL_DYNAMODB_ENDPOINT = process.env.LOCAL_DYNAMODB_ENDPOINT || 'http://localhost:8000';

export class DynamodbCRUD<T,C,U> implements CRUDRepo<T,C,U>{
    protected dynamodb: Client.DynamoDB;
    protected tableName: string;
    protected partitionKey?: string;
    protected sortKey?: string;

    constructor(tableName: string, partitionKey?:string, sortKey?: string){
        const config = {};
        if(process.env.IS_OFFLINE) {
            (config as any).region = "localhost";
            (config as any).endpoint = LOCAL_DYNAMODB_ENDPOINT
        }
        
        this.tableName = tableName;
        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
        this.dynamodb  = new Client.DynamoDB(config);
    }

    create(create: C): Promise<T> {
        throw new Error("Method not implemented.");
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
}