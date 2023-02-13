import { attribute, autoGeneratedHashKey, hashKey, rangeKey, table } from "@aws/dynamodb-data-mapper-annotations";
import { BaseEntity } from "../common.types";
import { USER_TABLE } from "../envars";
import { UserRolePermissions } from "../types/UserRolePermissions";

@table(USER_TABLE)
export class User extends BaseEntity {
    /**
     * User ID
     */
    @autoGeneratedHashKey()
    userid?:String;

    @attribute()
    firstName?: string;

    @attribute({
        type:'Date',
        defaultProvider: ()=>new Date()
    })
    joinedDate?:Date;

    @hashKey({
        type:'Custom',
        marshall: (a:any)=> ({S: String(a)}),
        unmarshall: (v) => (v.S === 'true'),
        defaultProvider: ()=>false
    })
    isRemoved?: boolean;

    @attribute()
    permissions?:UserRolePermissions
}