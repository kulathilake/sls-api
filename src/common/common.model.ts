/**
 * All domain data classes should extend this class
 */
export abstract class DomainDataModel {
    private _createdOn: Date;
    private _createdBy: string;
    private _updatedOn: Date | undefined;
    private _updatedBy: string | undefined;
    private _isRemoved: boolean;
    private _removedOn: Date | undefined;
    private _removedBy: string | undefined;
    private _sharedWith: { user: string; permissions: string[]; }[] | undefined;

    constructor(
            createdOn: Date,
            createdBy: string
        ){
            this._createdOn = createdOn;
            this._createdBy = createdBy;
            this._isRemoved = false
        }
    

    public get sharedWith(): { user: string; permissions: string[]; }[] | undefined {
        return this._sharedWith;
    }
    public set sharedWith(value: { user: string; permissions: string[]; }[] | undefined) {
        this._sharedWith = value;
    }


    public get removedBy(): string | undefined {
        return this._removedBy;
    }
    public set removedBy(value: string | undefined) {
        this._removedBy = value;
    }
    public get removedOn(): Date | undefined {
        return this._removedOn;
    }
    public set removedOn(value: Date | undefined) {
        this._removedOn = value;
    }
    public get isRemoved(): boolean {
        return this._isRemoved;
    }
    public set isRemoved(value: boolean) {
        this._isRemoved = value;
    }
    public get updatedBy(): string | undefined {
        return this._updatedBy;
    }
    public set updatedBy(value: string | undefined) {
        this._updatedBy = value;
    }
    public get updatedOn(): Date | undefined {
        return this._updatedOn;
    }
    public set updatedOn(value: Date | undefined) {
        this._updatedOn = value;
    }
    public get createdBy(): string {
        return this._createdBy;
    }
    public set createdBy(value: string) {
        this._createdBy = value;
    }
    public get createdOn(): Date {
        return this._createdOn;
    }
    public set createdOn(value: Date) {
        this._createdOn = value;
    }
    static generateEntityId(prefix?:string):string{
        let id = prefix? prefix: '';
        // Generate Random ID
        return id;
    } 
    /**
     * Adds a given list of users to a data object
     * with edit (read,update) permissions granted on 
     * the entire data object.
     * @param users 
     */
    public shareWithEditors(...users:string[]):void {
        throw new Error('method not implemented')
    }
    /**
     * Adds a given list of users to data object
     * with view (read) persmissions granted on the 
     * entire data object.
     * @param users 
     */
    public shareWithViewers(...users:string[]):void{
        throw new Error('method not implemented')
    }

    /**
     * Persists this data object
     */
    public abstract save()
}