import { PageMeta, Page } from "../../../common/common.types";
import { CRUDRepo } from "../crud.repo";
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, QueryOptions } from "@aws/dynamodb-data-mapper";
import { ConditionExpression } from "@aws/dynamodb-expressions"
import { Service } from "typedi";

const LOCAL_DYNAMODB_ENDPOINT = process.env.LOCAL_DYNAMODB_ENDPOINT || 'http://localhost:8000';
const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-1';

/**
 * DynamoDB implementation of CRUD Repo
 */
@Service()
export class DynamodbCRUD<T, C, U> implements CRUDRepo<T, C, U>{
    protected dynamodb: DynamoDB;
    protected mapper: DataMapper;
    protected partitionKey: string;
    protected sortKey?: string;
    protected tableReady?: Promise<boolean>;
    protected modelConstructor: any;
    constructor(modelConstructor: any, partitionKey: string, sortKey?: string) {
        const config: DynamoDB.ClientConfiguration = {
            region: AWS_REGION,
            maxRetries: 2,
            logger: console
        };
        if (process.env.IS_OFFLINE) {
            (config as any).endpoint = LOCAL_DYNAMODB_ENDPOINT

        }

        this.partitionKey = partitionKey;
        this.sortKey = sortKey;
        this.dynamodb = new DynamoDB(config);

        this.mapper = new DataMapper({
            client: this.dynamodb
        });

        this.modelConstructor = modelConstructor;
        this.tableReady = this.ensureTable(modelConstructor);
    }
    async create(create: C): Promise<T> {
        try {
            if (await this.tableReady) {
                return this.mapper.put({
                    item: create
                }).then((d) => {
                    return { d } as T
                })
            } else {
                throw new Error('DataRepo:DynamoDbCRUD:Create: Table Non Existent or Not Ready')
            }
        } catch (error) {
            throw new Error('DataRepo:DynamoDbCRUD:Create: Unknown Error')
        }
    }
    async update(id: string, data: U): Promise<T> {

        try {
            if((data as any)[this.partitionKey]){
                delete (data as any)[this.partitionKey];
            }
            const currEntity = await this.findById(id); // TODO: remove this extra query.
            const updateFields = {
                updatedOn: new Date(),
                updatedBy: '?'
            }
            const payload = Object.assign(new this.modelConstructor(), {...currEntity,...data, ...updateFields});
            return this.mapper.update({
                item: payload,
            },{
                onMissing: 'skip',
                condition: {
                    type: 'Equals',
                    subject: this.partitionKey,
                    object: id
                }
            })
                .then(d => {
                    return { d } as T
                })
        } catch (error) {
            throw new Error('DataRepo:DynamoDbCRUD:Update: Unknown Error')

        }
    }
    findById(id: string): Promise<T> {
        const item = Object.assign(new this.modelConstructor(), { [this.partitionKey]: id });

        return this.mapper.get(item)
            .then(d => {
                return d as T
            })
            .catch(e => {
                throw new Error(`DataRepo:DynamoDbCRUD:FindById:${e.message || 'Unknown Error'}`)
            })
    }
    async findPageByQuery(query: DynamoDbQuery, page: PageMeta<T>): Promise<Page<T>> {
        try {
            if (await this.tableReady) {
                const resPage = { results: [] as T[] } as Page<T>;
                const queryOpts = {
                    limit: page.size,
                    scanIndexForward: true,
                    indexName: query.useIndex,
                } as QueryOptions;

                if (page.from && typeof page.from === 'string') {
                    queryOpts.startKey = {
                        [query.keyAttribName]: query.keyAttribValue as string,
                    }

                    if (page.fromField) {
                        queryOpts.startKey[page.fromField] = page.from
                    } else {

                    }
                }

                /** Filter */
                if (query.expressionAttribs) {
                    queryOpts.filter = query.expressionAttribs
                }

                const q = { [query.keyAttribName]: query.keyAttribValue };

                /** query execution */
                const results = this.mapper.query(this.modelConstructor, q, queryOpts)
                for await (const item of results) {
                    resPage.results.push(item as any);
                }
                resPage.count = results.count
                return Promise.resolve(resPage as Page<any>)
            } else {
                throw new Error('DataRepo:DynamoDbCRUD:findPageByQuery: Table Non Existent or Not Ready')
            }

        } catch (error) {
            if (process.env.IS_OFFLINE) {
                throw error;
            } else {
                throw new Error('DataRepo:DynamoDbCRUD:findPageByQuery: Unknown Error')
            }

        }
    }
    remove(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async ensureTable(domainObj: any): Promise<boolean> {
        // return await this.mapper.ensureTableExists(domainObj,{readCapacityUnits:5,writeCapacityUnits:5})
        // .then(()=>{return true})
        return Promise.resolve(true);
    }

}

export interface DynamoDbQuery {
    useIndex?: string,
    keyAttribName: string;
    keyAttribValue: string | number | boolean;
    expressionAttribs?: ConditionExpression
}