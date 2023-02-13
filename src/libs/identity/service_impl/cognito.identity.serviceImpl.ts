import { Service } from "typedi";
import { User } from "../../../modules/users/user.model";
import { IdentityAttribs, IdentityService, OAuthProvider, VerificationCodePurpose } from "../identity.service";
import AWS from 'aws-sdk';
import { AWS_REGION } from "../../../common/envars";

@Service()
export class CognitoIdentitySvc implements IdentityService{
    constructor(){
        AWS.config.update({
            region: AWS_REGION
        })
    }
    registerIdentity(attribs: IdentityAttribs): Promise<{ u: IdentityAttribs; accessToken: string; refreshToken?: string | undefined; }> {
        throw new Error("Method not implemented.");
    }
    removeIdentity(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateIdentity(attribs: Partial<IdentityAttribs>): Promise<IdentityAttribs> {
        throw new Error("Method not implemented.");
    }
    issueAccessTokenForEmailSignin(email: string, password: string): Promise<{ accessToken: string; refreshToken?: string | undefined; }> {
        throw new Error("Method not implemented.");
    }
    issueAccessTokenForOAuthSignin(grantToken: string, provider: OAuthProvider): Promise<{ accessToken: string; refreshToken?: string | undefined; }> {
        throw new Error("Method not implemented.");
    }
    generateJWTAccessToken(claims: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getClaimsFromAccessToken(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    sendVerificationCodeToEmail(email: string, purpose: VerificationCodePurpose): Promise<void> {
        throw new Error("Method not implemented.");
    }
    confirmVerificationCode(userId: string, code: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}