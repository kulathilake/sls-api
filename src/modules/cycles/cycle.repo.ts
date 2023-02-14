import { Service } from "typedi";
import { DynamodbCRUD } from "../../libs/datarepo/impl/dynamodb.crud.repo";
import { Cycle } from "./cycle.model";

@Service()
export class CycleRepo extends DynamodbCRUD<Cycle,Cycle,Cycle>{
    constructor(){
        super(Cycle,'cycleId')
    }
}