import { DynamodbCRUD } from "../impl/dynamodb.crud.repo";
import { MockDomainModel } from "./MockDomain.model";

export class MockDynamoDb extends DynamodbCRUD<any,any,any>{
    constructor(){
        super(MockDomainModel,'mockId')
    }
    getMapper(){
        return this.mapper
    }
}