import { DynamoDbQuery } from "../../libs/datarepo/impl/dynamodb.crud.repo";
import { PageMeta } from "../common.types";

/**
 * Dynamodb query request bodies need to adhere
 * to this interface
 * @deprecated
 */
export interface DynamodbQueryResourcesReqBodyDTO {
    query: DynamoDbQuery;
    page: PageMeta<any>;
}