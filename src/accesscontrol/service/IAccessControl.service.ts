/**
 * Access Control Service Interface
 */

import { Request } from "express";

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
     * to execute a given action.
     * @param action 
     * @param token
     */
    isAuthorized(action:string, token:string):Promise<boolean>;

    /**
     * Returns the matching action for a given express request;
     * @param request 
     */
    getActionFromRequest(request:Request):string;

    /**
     * Returns true if an action can be carried out by 
     * requests with no tokens (ie. unauthenticated)
     * @param action 
     */
    isActionAllowedWithNoToken(action:string):boolean;
}