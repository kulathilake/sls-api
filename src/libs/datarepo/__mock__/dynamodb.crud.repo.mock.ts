import { DynamodbCRUD } from "../impl/dynamodb.crud.repo";
import { MockDomainModel } from "./MockDomain.model";

export class MockDynamoDb extends DynamodbCRUD<any,any,any>{
    constructor(){
        super(MockDomainModel)
    }
    getMapper(){
        return this.mapper
    }
}