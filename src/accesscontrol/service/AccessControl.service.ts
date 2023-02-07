import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Inject, Service } from "typedi";
import { actions } from "../consts/actions";
import { getPermissionScopeForRole, getPermissionsFromGroup } from "../consts/permissions";
import { AccessControl } from "./IAccessControl.service";

@Service()
export class AccessControlImpl implements AccessControl {
    @Inject('BASE_PATH')
    basePath!: string;

    getUserRole(token: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getUserPermissions(token: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    authorizationChecker(action: string, userPermissions: string[]): boolean {
        throw new Error("Method not implemented.");
    }
    async isAuthorized(actionName: string, token: string): Promise<boolean> {
        const role = await this.getUserRole(token); 
        if(role){
            const permissions = getPermissionsFromGroup(role);
            const action = actions.find(a=>a.name === actionName);

            if(action){
                return action.requiredPermissions.some((group)=>{
                    return group.every(p=> permissions.includes(p))
                })

            }else{
                throw new Error('ACL:AuthorizationCheck(isAuthorized): Action not found');
            }
        } else {
            throw new Error('ACL:AuthorizationCheck(isAuthorized): Token does not provide a valid user role.')
        }
    }
    getActionFromRequest(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): string {
        const pathToMatch = this.basePath + request.path;
        const action = actions.find(action => action.path === pathToMatch && action.method === request.method);
        if(action){
            return action.name
        }else {
            throw new Error('ACL:getActionFromRequest: Action not found');
        }
    }
    isActionAllowedWithNoToken(actionName: string): boolean {
        const action = actions.find(a => a.name === actionName);
        return (!!action && action.requiredPermissions.length === 0);
    }

}