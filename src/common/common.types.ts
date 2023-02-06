/**
 * Serve Sizes identified within the application
 */
export enum ServeSize {
    INDIVIDUAL = 'Individual',
    ADULTS2 = '2 Adults',
    FAMILY = 'Family (2 Adults 2 Children)',
    FAMILYPLUS = 'Family Plus (4 Adults)',
    CUSTOM = 'Custom'
}

/**
 * A type to define the quantities of a given ingredient
 * for each Serve Size defined in ServeSize enum. 
 */
export type QuantityByServeSize = Map<ServeSize,number>;


/**
 * Recipe Instruction Type
 */

export type RecipeInstructionStep = {
    label: string,
    description: string,
    estimatedTimeTaken?: TimeBreakdown,
    media?: Media[]
    prevStep?: string | RecipeInstructionStep
    nextStep?: string | RecipeInstructionStep
    isFirst?: boolean,
    isLast?: boolean
}

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
    from?: number | string | T
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

/**
 * common dto interface
 */
export interface BaseDto {
    createdBy: string;
    createdOn: Date;
    updatedBy?: string;
    updatedOn?: Date;
    isRemoved?: boolean;
    removedOn?: Date;
    removedBy?: string;
    sharedWith?: {user:string, permissions:string[]}[] 

}

