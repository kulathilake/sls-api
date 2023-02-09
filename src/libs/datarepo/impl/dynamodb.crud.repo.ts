import { PageMeta, Page } from "../../../common/common.types";
import { CRUDRepo } from "../crud.repo";
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, QueryOptions } from "@aws/dynamodb-data-mapper";
import {ConditionExpression} from "@aws/dynamodb-expressions"
import { Service } from "typedi";

const LOCAL_DYNAMODB_ENDPOINT = process.env.LOCAL_DYNAMODB_ENDPOINT || 'http://localhost:8000';
const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-1';

/**
 * DynamoDB implementation of CRUD Repo
 */
@Service()
export class DynamodbCRUD<T,C,U> implements CRUDRepo<T,C,U>{
    protected dynamodb: DynamoDB;
    protected mapper: DataMapper;
    protected partitionKey?: string;
    protected sortKey?: string;
    protected tableReady?: Promise<boolean>;
    protected modelConstructor: any;
    constructor(modelConstructor:any, partitionKey?:string, sortKey?: string){
        const config = {
            region: AWS_REGION
        };
        if(process.env.IS_OFFLINE) {
            (config as any).endpoint = LOCAL_DYNAMODB_ENDPOINT
        }
        
        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
        this.dynamodb  = new DynamoDB(config);

        this.mapper = new DataMapper({
            client: this.dynamodb
        });

        this.modelConstructor = modelConstructor;
        this.tableReady = this.ensureTable(modelConstructor);
    }

    async create(create: C): Promise<T> {
        try{
            if(await this.tableReady) {
                return this.mapper.put({
                    item: create
                }).then((d)=>{
                    return {d} as T
                })
            } else {
                throw new Error('DataRepo:DynamoDbCRUD:Create: Table Non Existent or Not Ready')
            }
        } catch{
            throw new Error('DataRepo:DynamoDbCRUD:Create: Unknown Error')
        }
    }
    update(data: U): Promise<T> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async findPageByQuery(query: DynamoDbQuery, page: PageMeta<T>): Promise<Page<T>> {
        try {
            if(await this.tableReady){
                const resPage = { results: [] as T[] }  as Page<T>;
                const queryOpts = {} as QueryOptions;
                
                /** pagination */
                queryOpts.limit = page.size;
                if(page.from && typeof page.from === 'string') {
                    queryOpts.startKey = {
                        [query.id.name]: query.id.value as string,
                    }

                    if( page.fromName ) {
                        queryOpts.startKey[page.fromName] = page.from
                    }
                }
                
                /** Filter */
                if(query.expressionAttribs){
                    queryOpts.filter = query.expressionAttribs
                }

                /** query execution */
                const results = this.mapper.query(this.modelConstructor,{[query.id.name]: query.id.value, ...query.keyExpressions},queryOpts)
                for await (const item of results) {
                    resPage.results.push(item as any);
                }
                resPage.count = results.count;
                return Promise.resolve( resPage as Page<any>)
            }else{
                throw new Error('DataRepo:DynamoDbCRUD:findPageByQuery: Table Non Existent or Not Ready')
            }

        } catch (error) {
            if(process.env.IS_OFFLINE){
                throw error;
            } else {
                throw new Error('DataRepo:DynamoDbCRUD:findPageByQuery: Unknown Error')
            }
            
        }
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async ensureTable(domainObj:any):Promise<boolean>{
        return await this.mapper.ensureTableExists(domainObj,{readCapacityUnits:5,writeCapacityUnits:5})
        .then(()=>{return true})
    }
    
}

export interface DynamoDbQuery {
    id: {
        name: string,
        value: string
    }
    keyExpressions: any,
    expressionAttribs?: ConditionExpression
}