import { DynamodbCRUD } from "../dynamodb.crud.repo";

export class MockDynamoDb extends DynamodbCRUD<any,any,any>{
    getMapper(){
        return this.mapper
    }
}