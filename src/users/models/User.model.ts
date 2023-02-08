import { DomainDataModel } from "../../common/common.model";

export class User extends DomainDataModel {   
    private _userId: string;

    constructor(
        private _email: string,
        private _firstName: string,
        private _lastName: string,
        private _isEmailVerified: boolean,
        private _profilePicture: string,
        private _role: string,
        private _permissions: string[],
        createdOn: Date,
        createdBy: string,
        userId: string
        ){
        super(createdOn,createdBy);
        if(userId){
            this._userId = userId;
        }else{
            this._userId = DomainDataModel.generateEntityId('user') 
        }
    }

    public save() {
        throw new Error("Method not implemented.");
    }
    public mapToDto() {
        throw new Error("Method not implemented.");
    }

    /** Getters & Setters */
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
    public get profilePicture(): string {
        return this._profilePicture;
    }
    public set profilePicture(value: string) {
        this._profilePicture = value;
    }
    public get isEmailVerified(): boolean {
        return this._isEmailVerified;
    }
    public set isEmailVerified(value: boolean) {
        this._isEmailVerified = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get permissions(): string[] {
        return this._permissions;
    }
    public set permissions(value: string[]) {
        this._permissions = value;
    }
    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
}