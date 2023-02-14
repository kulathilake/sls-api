import Container from "typedi";
import { BaseEntity } from "../../../common/common.types";
import { AccessControlImpl } from "../service/AccessControl.service";
import { Action } from "../types/acl.types";

Container.set("BASE_PATH", "test");

let svc = new AccessControlImpl();

describe("AccessControl Service Test Suite", () => {

    /**
     * Test Suite for isAuthorizedToOperateOnEntity
     */
    describe("method:isAuthorizedToOperateOnEntity", () => {
        beforeAll(() => {
            (svc as any).authorizationChecker = jest.fn(() => true);
        });
        it("Should return isOwn as true when the user is the creator of entity", () => {
            const obj: BaseEntity = {
                createdBy: "user-001",
            };
            const action: Action = {
                name: "acn_name",
                method: "PUT",
                path: "/",
                resource: "obj",
                requiredPermissions: [],
            };
            const res = svc.isAuthorizedToOperateOnEntity(action, obj, "user-001", []);

            expect(res.isOwn).toBeTruthy();
        });
        it("Should return isOwn as true when createdBy is cross referenced own valid field", () => {
            const obj: BaseEntity = {
                updatedBy: "user-001",
                createdBy: "$updatedBy",
            };
            const action: Action = {
                name: "acn_name",
                method: "PUT",
                path: "/",
                resource: "obj",
                requiredPermissions: [],
            };
            const res = svc.isAuthorizedToOperateOnEntity(action, obj, "user-001", []);

            expect(res.isOwn).toBeTruthy();
        });
        it("Should return isOwn as false when createdBy does not match userId", () => {
            const obj: BaseEntity = {
                createdBy: "user-002",
            };
            const action: Action = {
                name: "acn_name",
                method: "PUT",
                path: "/",
                resource: "obj",
                requiredPermissions: [],
            };
            const res = svc.isAuthorizedToOperateOnEntity(action, obj, "user-001", []);

            expect(res.isOwn).toBeFalsy();
        });
        afterAll(() => {
            svc = new AccessControlImpl();
        });
    });
    /**
     * Test Suite for getCrossReferenceFeildValue
     * @todo should move into a utility class and
     * a relevant spec file
     */
    describe("method:getCrossReferenceFieldValue", () => {
        it("should return referenced value when there is a reference with a valid field name", () => {
            const obj = {
                userId: "001",
                createdBy: "$userId",
            };
            const crossRef = (svc as any).getCrossReferenceFieldValue(obj, "createdBy");
            expect(crossRef).toEqual(obj.userId);
        });
        it("should return original value when there is no reference.", () => {
            const obj = {
                userId: "001",
                createdBy: "admin",
            };
            const crossRef = (svc as any).getCrossReferenceFieldValue(obj, "createdBy");
            expect(crossRef).toEqual(obj.createdBy);
        });
        it("should throw invalid reference error when referred field is invalid", () => {
            const obj = {
                userId: "001",
                createdBy: "$uuser",
            };

            expect(() => {
                (svc as any).getCrossReferenceFieldValue(obj, "createdBy");
            }).toThrow();

        });
    });
});