import Container, { Inject, Service } from "typedi";
import { IdentityService } from "../../libs/identity/identity.service";
import { Cycle } from "./cycle.model";
import { CycleRepo } from "./cycle.repo";
import { Page, PageMeta } from "../../common/common.types";

@Service()
export class CycleService {

    @Inject("IDENTITY_SERVICE")
    idSvc!: IdentityService;
    repo: CycleRepo;

    constructor() {
        this.repo = Container.get(CycleRepo);
    }
    async createCycle(userId: string, data: Cycle): Promise<Cycle> {
        if(await this.doesUserHaveActiveCycles(userId)){
            throw new Error("Cycle:Service:CreateCycle:One Cycle already Active")
        }
        if (this.isClaimedUIDValid(userId)) {
            const payload = Object.assign(new Cycle(), {
                ...data,
                isActive: true,
                userId
            })
            return this.repo.create(payload);
        } else {
            throw new Error('Cycle:Service:CreateCycle:Claimed UID does not match token')
        }

    }
    async getActiveCycle(userId: string): Promise<Cycle|null> {
        if(!this.isClaimedUIDValid(userId)){
            throw new Error('Cycle:Service:CreateCycle:Claimed UID does not match token');
        }
        return this.repo.findPageByQuery({
            keyAttribName: 'userId',
            keyAttribValue: userId,
            useIndex: 'activeCycles',
            secondaryAttribs: [
                {
                    Name: 'isActive',
                    Value: 'true'
                }
            ]
        },{size:1})
        .then(d=>{
            if(d.count === 0){
                return null
            } else {
                return d.results[0];
            }
            
        })
    }

    async getUserCycles(userId: string, page: PageMeta<Cycle>): Promise<Page<Cycle>> {
        if (this.isClaimedUIDValid(userId)) {
            return this.repo.findPageByQuery({
                keyAttribName: 'userId',
                keyAttribValue: userId,
                useIndex: 'currentUserCycles'
            }, page)
        } else {
            throw new Error('Cycle:Service:CreateCycle:Claimed UID does not match token')
        }
    }

    async updateUserCycle(cycleId:string, userId:string, payload:Cycle):Promise<Cycle>{
        if(this.isClaimedUIDValid(userId)){
            return this.repo.update(cycleId, payload);
        } else {
            throw new Error('Cycle:Service:CreateCycle:Claimed UID does not match token');
        }


    }
    private isClaimedUIDValid(userId: string): boolean {
        return this.idSvc.currentUser?.userId === userId;
    }

    private async doesUserHaveActiveCycles(userId:string):Promise<boolean>{
        return !!(await this.getActiveCycle(userId));   
    }

}