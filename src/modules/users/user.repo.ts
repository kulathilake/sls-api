import { Service } from "typedi";
import { DynamodbCRUD } from "../../libs/datarepo/impl/dynamodb.crud.repo";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { User } from "./user.model";

@Service()
export class UserRepo extends DynamodbCRUD<User,User,UpdateUserDto>{
    constructor(){
        super(User,'userid');
    }  
    
    create(create: User): Promise<User> {
        return super.create(create);
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        try {
            return super.update(id,data);
        } catch (error) {
            throw new Error(`User:Repo:update:${(error as any).message}`)
        }

    }
}