/**
 * Access Control Service Interface
 */

import { Request } from "express";
import { BaseEntity } from "../../../common/common.types";
import { Action } from "../types/acl.types";

export interface AccessControl {
    /**
     * obtains the role of the user identified by access token
     * @param token 
     */
    getUserRole(token:string):Promise<string>;
    /**
     * obtains the custom permissions granted to the user identified
     * by access token.
     * @param token 
     */
    getCustomUserPermissions(token:string):Promise<string[]>
    /**
     * is current 
     * @param action 
     * @param roles 
     */

    /**
     * Single method that will perform user fetching
     * and checking if the user has ample permissions
     * to execute a given action on an API Endpoint.
     * This will not check entity level permissions.
     * @param action 
     * @param token
     */
    isAuthorizedToAcessEndpoint(action:Action, token:string):Promise<boolean>;

    /**
     * Checks if a given operation can be performed on
     * an entity by a user identified by a userId;
     * @param entity entity to operate on
     * @param userId userId to check against
     * @param permissions permissions user has
     */
    isAuthorizedToOperateOnEntity(action:Action, entity:BaseEntity, userId:string, permissions:string[]):{permMatch:boolean, isOwn:boolean};
    
    /**
     * Returns the matching action for a given express request;
     * @param request 
     */
    getActionFromRequest(request:Request):Action;

    /**
     * Returns true if an action can be carried out by 
     * requests with no tokens (ie. unauthenticated)
     * @param action 
     */
    isActionAllowedWithNoToken(action:string):boolean;

    /**
     * adds an action to the action object.
     * @param action 
     */
    addAction(action:Action):void;
}