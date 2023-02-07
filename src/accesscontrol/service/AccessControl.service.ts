import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Service } from "typedi";
import { AccessControl } from "./IAccessControl.service";

@Service('AccessControl')
export class AccessControlImpl implements AccessControl {
    getUserRole(token: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getUserPermissions(token: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    authorizationChecker(action: string, userPermissions: string[]): boolean {
        throw new Error("Method not implemented.");
    }
    isAuthorized(action: string, token?: string | undefined): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getActionFromRequest(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): string {
        throw new Error("Method not implemented.");
    }
    isActionAllowedWithNoToken(action: string): boolean {
        throw new Error("Method not implemented.");
    }

}