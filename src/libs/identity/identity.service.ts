import { Roles, UserRolePermissions } from "../../common/types/UserRoles";

export interface IdentityService {
    /**
     * registers a user in the user pool
     * @param user 
     */
    registerIdentity(attribs: IdentityAttribs):Promise<{u:IdentityAttribs,accessToken:string,refreshToken?:string}>
    /**
     * removes a user identity from user pool
     */
    removeIdentity(userId: string):Promise<void>;
    /**
     * Updates user identity attribs (claims etc.) in
     * user pool.
     * @param attribs 
     */
    updateIdentity(attribs:Partial<IdentityAttribs>):Promise<IdentityAttribs>;
    /**
     * issues access token for email sign-ins
     * @param email 
     * @param password 
     */
    issueAccessTokenForEmailSignin(email:string,password:string):Promise<{accessToken:string, refreshToken?:string}>
    /**
     * Issues an access token for Grant Tokens issued by OAuth
     * providers.
     * @param grantToken 
     * @param provider 
     */
    issueAccessTokenForOAuthSignin(grantToken:string, provider: OAuthProvider):Promise<{accessToken:string, refreshToken?:string}>
    /**
     * Generates a signed JWT token with a given set of claims
     */
    generateJWTAccessToken(claims:any):Promise<string>;
    /**
     * decodes a JWT token to obtain token claims.
     * @param token 
     */
    getClaimsFromAccessToken(token:string):Promise<any>;

    /**
     * Sends a unique verification code to a user
     * code is generated based on userId, email and purpose.
     * @param userId 
     * @param email 
     * @param purpose 
     */
    sendVerificationCodeToEmail(email: string, purpose:VerificationCodePurpose): Promise<void>;

    /**
     * Verifies a Verification Code sent to a user.
     * @param userId 
     * @param code 
     */
    confirmVerificationCode(userId:string, code:string): Promise<boolean>;
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
    email: string,
    role: Roles,
    permissions?: UserRolePermissions
}