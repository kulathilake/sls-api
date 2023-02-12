import { Inject, Service } from "typedi";
import { User } from "./user.model";
import { UserRepo } from "./user.repo";

@Service()
export class UserService {
    @Inject()
    repo!: UserRepo;

    /**
     * 
     * @param u 
     */
    createNewUser(u:User):Promise<User>{
        throw new Error('method not implemented')
    }
}