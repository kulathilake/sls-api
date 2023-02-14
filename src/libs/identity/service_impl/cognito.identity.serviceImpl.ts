import { Service } from "typedi";
import { IdentityAttribs, IdentityService, OAuthProvider, VerificationCodePurpose } from "../identity.service";
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AWS_REGION, USER_POOL_CLIENT_ID } from "../../../common/envars";
import { Roles } from "../../../common/types/UserRoles";
import { getPermissionOnRole } from "../../accesscontrol/consts/permissions";



@Service()
export class CognitoIdentitySvc implements IdentityService{
    private client:CognitoIdentityServiceProvider

    constructor(){
        this.client = new CognitoIdentityServiceProvider({
            region: AWS_REGION
        });
    }
    verifyEmailConfirmationCode(email: string, code: string): Promise<boolean> {
        return new Promise((res,rej)=>{
            this.client.confirmSignUp({
                ClientId: USER_POOL_CLIENT_ID,
                Username: email,
                ConfirmationCode: code
            }).send((err,data)=>{
                if(err){
                    rej(err);
                }else{
                    res(true)
                }
            })
        })
    }
    
    signUpWithEmail(email: string, password: string, role: Roles): Promise<IdentityAttribs> {
        const permissions = getPermissionOnRole(role);
        return new Promise((res,rej)=>{
            this.client.signUp({
                ClientId: USER_POOL_CLIENT_ID,
                Username: email,
                Password: password,
                UserAttributes: [
                    {Name: 'email', Value: email},
                    {Name: 'custom:role', Value: role.toString()},
                    {Name: 'custom:permissions', Value: JSON.stringify(permissions)}
                ]
            })
            .send((err,data)=>{
                if(err){
                    rej(err);
                }else {
                    res({
                        userId: data.UserSub,
                        email: email,
                        permissions: permissions
                    })
                }
            })
        })
    }

    verifyToken(token: string): Promise<IdentityAttribs> {
      
        return new Promise((res,rej) => {
            this.client.getUser({
                AccessToken:token
            })
            .send((err,data)=>{
                if(err){
                    rej(err);
                }else {
                    res({
                        userId: data.UserAttributes.find(a=>a.Name==='sub'), 
                        email: data.UserAttributes.find(a=>a.Name==='email')?.Value,
                        role: data.UserAttributes.find(a=>a.Name==='custom:role')?.Value,
                    } as IdentityAttribs)
                }
            })
        })

    }


}