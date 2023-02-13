import { Service } from "typedi";
import { DynamodbCRUD } from "../../libs/datarepo/impl/dynamodb.crud.repo";
import { User } from "../../common/models/user.model";

@Service()
export class UserRepo extends DynamodbCRUD<User,User,User>{
    constructor(){
        super(User,'userid');
    }  
    
    create(create: User): Promise<User> {
        return super.create(create);
    }
}