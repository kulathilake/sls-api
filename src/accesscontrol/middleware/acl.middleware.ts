import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { AccessControlImpl } from "../service/AccessControl.service";

/**
 * This custom middleware function will intercept the express
 * request (path & token) to verify if the action being perfor
 * -med is permissible to the user identified by the token (if any)
 * @param req 
 * @param res 
 * @param next 
 */
export async function accesscontrol(req:Request,res:Response, next:NextFunction) {
    const aclSVc = Container.get(AccessControlImpl);

    try {
        let isAllowed: boolean;
        const token = req.headers['authorization'];
        const action = aclSVc.getActionFromRequest(req);
        if(token){
            isAllowed = await aclSVc.isAuthorized(action,token)
        } else {
            isAllowed = aclSVc.isActionAllowedWithNoToken(action);
        }
        if(isAllowed){
            next();
        }else{
            res.status(401).json({
                error: 'Authorization Issue: Access Denied',
                action
            })
        }
    } catch (error) {
        res.status(401).json({
            error: 'Authorization Issue: Failed to determine access clearence',
            verbose: {
                error: (error as Error).message, 
            }
        })
    } 
}