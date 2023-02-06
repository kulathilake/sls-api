import { DomainDataModel } from "../../common/common.model";

export class Ingredient extends DomainDataModel {

    
    constructor(

        createdOn: Date,
        createdBy: string
    ){
        super(createdOn,createdBy);
    }

    public save() {
        
    }

    public mapToDto() {
        throw new Error("Method not implemented.");
    }
}