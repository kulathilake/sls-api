import { Service } from "typedi";
import { DynamodbCRUD } from "../../libs/datarepo/impl/dynamodb.crud.repo";
import { User } from "./user.model";

@Service()
export class UserRepo extends DynamodbCRUD<User,User,User>{
    constructor(){
        super(User,'userid');
    }    
}