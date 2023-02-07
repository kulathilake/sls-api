import { PageMeta, Page } from "../common.types";
import { CRUDRepo } from "./crud.repo";
import Client from '@aws-sdk/client-dynamodb';


export class DynamodbCRUD<T,C,U> implements CRUDRepo<T,C,U>{
    protected dynamodb: Client.DynamoDB;
    
    constructor(){
        const config = {};
        if(process.env.IS_OFFLINE) {
            (config as any).region = "localhost";
            (config as any).endpoint = "http://localhost:8000"
        }
        
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