import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { match, pathToRegexp } from "path-to-regexp";
import { ParsedQs } from "qs";
import { Inject, Service } from "typedi";
import { BaseEntity } from "../../../common/common.types";
import { IdentityAttribs, IdentityService } from "../../identity/identity.service";
import { CognitoIdentitySvc } from "../../identity/service_impl/cognito.identity.serviceImpl";
import { getPermissionOnRole, getPermissionsOnResourceType } from "../consts/permissions";
import { Action } from "../types/acl.types";
import { AccessControl } from "./IAccessControl.service";

@Service()
export class AccessControlImpl implements AccessControl {

    @Inject("BASE_PATH")
    basePath!: string;

    @Inject("IDENTITY_SERVICE")
    idSvc!: IdentityService;

    /**
     * Cache a read entity for future use
     */
    private _cachedEntity?: {id: string, data: any};

    private actions: Action[] = [];

    get cachedEntity(): {id: string, data: any} | null {
        if (this._cachedEntity){
            return this.cachedEntity;
        } else {
            return null;
        }
    }

    async getUserRole(token: string): Promise<string> {

            /** by pass for offline development */
            if (process.env.IS_OFFLINE && token.length === 0){
                return Promise.resolve("ADMIN");
            }else {
                return this.idSvc.verifyToken(token)
                .then((res) => {
                    this.setAuthUserAttribs(res);
                    if (res?.role) return res.role;
                    throw new Error("ACL:getUserRole:Auth did not return role");
                })
                .catch((e) => {
                    throw new Error(`ACL:getUserRole:${(e as any).message}`);
                });
            }

    }

    getCustomUserPermissions(token: string): Promise<string[]> {

        /** by pass for offline development */
        if (process.env.IS_OFFLINE){
            return Promise.resolve([]);
        }else {
            throw new Error("method not implemented");
        }

    }

    async isAuthorizedToAcessEndpoint(action: Action, token: string): Promise<boolean> {
        const role = await this.getUserRole(token);
        const customPerms = await this.getCustomUserPermissions(token) || [];
        if (role && action){
            const permissions = getPermissionsOnResourceType(role, action.resource);
            return this.authorizationChecker(action, [...permissions, ...customPerms]);
        } else {
            throw new Error("ACL:AuthorizationCheck(isAuthorized): Token does not provide a valid user role.");
        }
    }

    isAuthorizedToOperateOnEntity(action: Action, entity: BaseEntity, userId: string, permissions: string[]): {permMatch: boolean, isOwn: boolean} {
        const sharedPermissions = entity.sharedWith?.find((sw) => sw.user === userId)?.permissions;
        const allPerms: string[] = [...permissions];
        const isOwn = this.getCrossReferenceFieldValue(entity, "createdBy") === userId;
        sharedPermissions?.forEach((perm) => {
            if (!allPerms.includes(perm)){
                allPerms.push(perm);
            }
        });

        return {
            permMatch : this.authorizationChecker(action, allPerms),
            isOwn,
        };

    }
    getActionFromRequest(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Action {
        const requestPath = this.basePath + request.path;
        const doesMatch = (p: string) => match(p, {decode: decodeURIComponent});
        const action = this.actions.find((action) => doesMatch(action.path)(requestPath) && action.method === request.method);
        if (action){
            return action;
        }else {
            throw new Error("ACL:getActionFromRequest: Action not found");
        }
    }

    isActionAllowedWithNoToken(actionName: string): boolean {
        const action = this.actions.find((a) => a.name === actionName);
        return (!!action && action.requiredPermissions.some((permGroup) => {permGroup.every((p) => p === "*"); }));
    }

    addAction(action: Action): void {
        this.actions.push(action);
    }

    /**
    * User must have all permissions in at least a
    * single group
    */
    private authorizationChecker(action: Action, userPermissions: string[]): boolean {
        if (action){
            if (action.requiredPermissions.length === 0) return true;
            const authMatch = action.requiredPermissions.some((group) => {
                const match = group.every((p) => userPermissions.includes(p));
                if (match) {
                    return true;
                }
            });
            return authMatch;
        }else{
            throw new Error("ACL:AuthorizationCheck(isAuthorized): Action not found");
        }

    }

    /**
     * gets the value cross referenced by a field
     * inside the same entity
     * @param Obj
     * @param fieldName
     * @returns
     * @todo should belong in a util class
     */
    private getCrossReferenceFieldValue(Obj: any, fieldName: string): any {
        const fieldExists = !!Obj[fieldName];
        if (fieldExists){
            const match = (Obj[fieldName] as string).match(/[^$]*$/);

            if (match && match?.["index"] && match[0] ){
                if (Obj[match[0]]){
                    return Obj[match[0]];
                }else {
                    throw new Error(`ACL:getCrossReferenceFieldValue:Invalid Field Reference - ${match[0]}`);
                }
            }else{
                return Obj[fieldName];
            }
        } else {
            return null;
        }
    }

    private setAuthUserAttribs(attribs: IdentityAttribs) {
        if (attribs.permissions === undefined && attribs.role){
            attribs.permissions = getPermissionOnRole(attribs.role);
        }
        this.idSvc.currentUser = attribs;
    }

}