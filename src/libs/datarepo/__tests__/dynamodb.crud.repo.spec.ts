import { DynamodbCRUD } from "../dynamodb.crud.repo"
import { MockDynamoDb } from "../__mock__/dynamodb.crud.repo.mock";
import { MockDomainModel } from "../__mock__/MockDomain.model";
import 'reflect-metadata';

let repo: MockDynamoDb;

describe("Dynamodb CRUD Repo Test Suite", () =>{
    beforeEach(()=>{
        repo = new MockDynamoDb();
    })

    it("Instantiation check",()=>{
        expect(repo).toBeInstanceOf(DynamodbCRUD);
    });

    describe("create", ()=>{
        
        beforeAll(()=>{
            repo.getMapper().put = jest.fn().mockReturnValue(Promise.resolve({}));
        });

        it('should call mapper put with item', async ()=> {
            const mapped = Object.assign(new MockDomainModel(), {name: 'shehan'});
            jest.spyOn(repo.getMapper(),'put');
            await repo.create(mapped);
            expect(repo.getMapper().put).toHaveBeenCalledWith({item:mapped});
        })
    })


    
})