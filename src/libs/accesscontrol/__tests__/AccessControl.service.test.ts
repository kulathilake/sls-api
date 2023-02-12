import Container from "typedi";
import { AccessControlImpl } from "../service/AccessControl.service"

Container.set('BASE_PATH', 'test');



const svc = new AccessControlImpl();

describe('AccessControl Service Test Suite', ()=>{
    describe('method:getCrossReferenceFieldValue', ()=>{
        let fnSpy: jest.SpyInstance;
        beforeAll(()=>{
            fnSpy = jest.spyOn((svc as any),'getCrossReferenceFieldValue')
        })
        it('should return referenced value when there is a reference with a valid field name', () => {
            const obj = {
                userId: '001',
                createdBy: '$userId'
            }
            const crossRef = (svc as any).getCrossReferenceFieldValue(obj,'createdBy')
            expect(crossRef).toEqual(obj.userId);
        });
        it('should return original value when there is no reference.',()=>{
            const obj = {
                userId: '001',
                createdBy: 'admin'
            }
            const crossRef = (svc as any).getCrossReferenceFieldValue(obj, 'createdBy');
            expect(crossRef).toEqual(obj.createdBy);
        });
        it('should throw invalid reference error when referred field is invalid',()=>{
            const obj = {
                userId: '001',
                createdBy: '$uuser'
            };
            
            expect(()=> {
                (svc as any).getCrossReferenceFieldValue(obj, 'createdBy');
            }).toThrow();

        })
    })


})