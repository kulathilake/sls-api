import { DynamoDbQuery } from "../../libs/datarepo/dynamodb.crud.repo";
import { PageMeta } from "../common.types";

/**
 * Dynamodb query request bodies need to adhere 
 * to this interface
 */
export interface DynamodbQueryResourcesReqBodyDTO {
    query: DynamoDbQuery
    page: PageMeta<any>
}