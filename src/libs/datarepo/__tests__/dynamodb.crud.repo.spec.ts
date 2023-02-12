import { DynamodbCRUD } from "../impl/dynamodb.crud.repo"
import { MockDynamoDb } from "../__mock__/dynamodb.crud.repo.mock";
import { MockDomainModel } from "../__mock__/MockDomain.model";
import 'reflect-metadata';
import { DataMapper } from "@aws/dynamodb-data-mapper";

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
            jest.spyOn(DataMapper.prototype,'put').mockImplementation((...args:any)=>{
                return Promise.resolve({} as any) 
            })
        });

        it('should call mapper put with item', async ()=> {
            const mapped = Object.assign(new MockDomainModel(), {name: 'shehan'});
            jest.spyOn(repo.getMapper(),'put');
            await repo.create(mapped);
            expect(repo.getMapper().put).toHaveBeenCalledWith({item:mapped});
        })
    })

    afterAll(()=>{
        jest.resetAllMocks();
    })
    
})