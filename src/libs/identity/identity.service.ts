import { Roles, UserRolePermissions } from "../../common/types/UserRoles";

export interface IdentityService {
    /**
     * decodes a JWT token to obtain token claims.
     * @param token 
     */
    verifyToken(token:string):Promise<IdentityAttribs>;
}

export enum OAuthProvider {
    GOOGLE,
    FACEBOOK
} 

export enum VerificationCodePurpose {
    EMAIL_VERIFICATION,
    PASSWORD_RESET
}

export interface IdentityAttribs {
    userId?:string,
    email?: string,
    password?:string,
    role?: Roles,
    permissions?: UserRolePermissions
}