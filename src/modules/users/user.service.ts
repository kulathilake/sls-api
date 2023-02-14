import Container, { Inject, Service } from "typedi";
import { Page, PageMeta } from "../../common/common.types";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { User } from "./user.model";
import { UserRepo } from "./user.repo";

@Service()
export class UserService {
    repo: UserRepo;

    constructor(){
        this.repo = Container.get(UserRepo);
    }

    /**
     * creates a new user
     * @param u
     */
    createNewUser(u: User): Promise<User>{
        u.createdBy = u.createdBy || "$userId";
        return this.repo.create(u);
    }

    /**
     * finds a user by id.
     * @param id
     * @returns
     */
    findUserById(id: string): Promise<User> {
        return this.repo.findById(id)
        .catch((e) => {
            if (e.message?.match("No item with the key")){
                throw new Error("User:Service:FindUserById: Not Found");
            }
            throw e;
        });
    }

    /**
     * lists active users.
     * @param page
     * @returns
     */
    listActiveUsers(page: PageMeta<any>): Promise<Page<User>>{
        return this.repo.findPageByQuery({
            keyAttribName:  "isRemoved",
            keyAttribValue: "false",
            useIndex: "activeUsers",
        }, {
            size: page.size || 10,
            from: page.from,
            fromField: "userId",
        });
    }

    updateUser(id: string, data: UpdateUserDto): Promise<User> {
        return this.repo.update(id, data);
    }

}