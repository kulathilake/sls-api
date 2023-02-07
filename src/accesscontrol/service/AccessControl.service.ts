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

    /**
     * Cache token reads
     */
    private _cachedUser: any;
    /**
     * Cache a read entity for future use
     */
    private _cachedEntity?: {id:string,data:any};

    get currentUser(){
        if(this._cachedEntity){
            return this._cachedUser;
        } else {
            return null
        }
    }

    get cachedEntity():{id:string,data:any} | null {
        if(this._cachedEntity){
            return this.cachedEntity
        } else {
            return null;
        }
    }

    async getUserRole(token: string): Promise<string> {
        if(this.currentUser){
            return (this.currentUser as any).role;
        } else {
            throw new Error("Method not implemented.");
        }
    }

    getCustomUserPermissions(token: string): Promise<string[]> {
        if(this.currentUser){
            return (this.currentUser as any).customPermissions;
        } else {
            throw new Error("Method not implemented.");
        }
    }

    async isAuthorized(actionName: string, token: string): Promise<boolean> {
        const role = await this.getUserRole(token); 
        const customPerms = await this.getCustomUserPermissions(token);

        if(role){
            const permissions = getPermissionsFromGroup(role);
            return this.authorizationChecker(actionName,permissions)
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

    private authorizationChecker(actionName: string, userPermissions: string[]): boolean {
        const action = actions.find(a=>a.name === actionName);
        if(action){
            return action.requiredPermissions.some((group)=>{
                return group.every(p=> userPermissions.includes(p))
            })
        }else{
            throw new Error('ACL:AuthorizationCheck(isAuthorized): Action not found');
        }

    }

}