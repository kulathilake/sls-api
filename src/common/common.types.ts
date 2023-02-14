import { attribute } from "@aws/dynamodb-data-mapper-annotations";

/**
 * A representation of time in terms of Days, hours, mins and seconds.
 */
export type TimeBreakdown = {
    D: number,
    H : number;
    M : number;
    S : number;
}

/**
 * Type defintion for media files made available or accessed
 * directly via the application or embedded. (eg: Youtube)
 */
export type Media = {
    id?: string,
    url: string,
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE' ,
    isEmbedded?: boolean,
    size?: number
}

/**
 * Data Pagination
 */

/**
 * Page Metadata to identify a page
 */
export type PageMeta<T> = {
    size: number
    from?: number | string |  {name:string, value: string | number}
    fromField? :string
    sort?: Sort
}

/**
 * Actual page defined by meta 
 * and as retrieved from datastore.
 */
export type Page<T> = {
    count: number,
    meta: PageMeta<T>
    next?: PageMeta<T> 
    results: T[]
}

export type Sort = {
    fieldName: string,
    direction: 'ASC' | 'DESC'
}

/**
 * common base entity
 */
export class BaseEntity {
    @attribute()
    createdBy?: string;
    @attribute({
        type: 'Date',
        defaultProvider: ()=> new Date()
    })
    createdOn?: Date;
    @attribute()
    updatedBy?: string;
    @attribute({
        type: 'Date',
    })
    updatedOn?: Date;
    isRemoved?: boolean;
    removedOn?: Date;
    removedBy?: string;
    sharedWith?: {user:string, permissions:string[]}[] 
}

