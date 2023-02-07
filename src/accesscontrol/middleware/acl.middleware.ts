import { NextFunction, Request, Response } from "express";
import Container, { Inject } from "typedi";
import {AccessControl} from "../service/IAccessControl.service"

const aclSVc = Container.get('AccessControl') as AccessControl;
/**
 * This custom middleware function will intercept the express
 * request (path & token) to verify if the action being perfor
 * -med is permissible to the user identified by the token (if any)
 * @param req 
 * @param res 
 * @param next 
 */
export async function accesscontrol(req:Request,res:Response, next:NextFunction) {
    try {
        let isAllowed: boolean;
        const token = req.headers['authorization'];
        const action = aclSVc.getActionFromRequest(req);

        if(!token){
            isAllowed = aclSVc.isActionAllowedWithNoToken(action);
        } else {
            isAllowed = await aclSVc.isAuthorized(action,token)
        }
        if(isAllowed){
            next();
        }else{
            res.send(401).json({
                error: 'Authorization Issue: Access Denied',
                action
            })
        }
        next();
    } catch (error) {
        res.send(401).json({
            error: 'Authorization Issue: Failed to determine access clearence'
        })
    } 
}