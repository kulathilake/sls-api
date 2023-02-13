import { Service } from "typedi";
import { IdentityAttribs, IdentityService, OAuthProvider, VerificationCodePurpose } from "../identity.service";
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AWS_REGION } from "../../../common/envars";

@Service()
export class CognitoIdentitySvc implements IdentityService{
    private client:CognitoIdentityServiceProvider

    constructor(){
        this.client = new CognitoIdentityServiceProvider({
            region: AWS_REGION
        });
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
                        userId: data.Username,
                        email: data.UserAttributes.find(a=>a.Name==='email')?.Value,
                        role: data.UserAttributes.find(a=>a.Name==='custom:role')?.Value,
                    } as IdentityAttribs)
                }
            })
        })

    }


}