import { Roles, UserRolePermissions } from "../../common/types/UserRoles";

export interface IdentityService {
    currentUser: IdentityAttribs | null;
    /**
     * Signs up a new user with email & password
     * @param email 
     * @param password 
     * @param role 
     */
    signUpWithEmail(email:string,password:string,role:Roles):Promise<IdentityAttribs>;

    /**
     * Returns access and refresh tokens for a valid email 
     * password combination
     * @param email 
     * @param password 
     */
    signInWithEmail(email:string,password:string):Promise<{accessToken:string, refreshToken: string}>;

    /**
     * Returns a new access token based on refresh token
     * @param token 
     */
    refreshAccessToken(token:string):Promise<{accessToken:string}>
    /**
     * verifies a user account
     * @param username 
     * @param code 
     */
    verifyEmailConfirmationCode(username:string, code:string):Promise<boolean>;
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