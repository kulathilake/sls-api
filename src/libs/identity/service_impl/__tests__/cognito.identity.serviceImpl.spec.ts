import { CognitoIdentityServiceProvider } from "aws-sdk";
import { AWSError } from "aws-sdk/lib/error";
import { Roles } from "../../../../common/types/UserRoles";
import { IdentityAttribs } from "../../identity.service";
import { CognitoIdentitySvc } from "../cognito.identity.serviceImpl"

class TestableCognitoIdentitySVC extends CognitoIdentitySvc {

};

let svc: TestableCognitoIdentitySVC;

describe('Cognito Identity Service Test Suite', () => {

    /**
     * Token Verification
     */
    describe('method:getClaimsFromAccessToken', () => {
        let tokenMap: {[token:string]:IdentityAttribs} = {
            token1: {
                userId: 'userId',
                email: 'user@domain.com',
                role: Roles.ADMIN,
            }
        }
        beforeAll(()=>{
            svc = new TestableCognitoIdentitySVC();
            jest.spyOn(((svc as any).client),'getUser').mockImplementation((params)=>{
                const p = params as CognitoIdentityServiceProvider.GetUserRequest;
                return {
                    send: ((callback:(e:any,d:any)=>void)=>{
                        const attribs = tokenMap[p.AccessToken]
               
                        if(attribs){
                            const resp:CognitoIdentityServiceProvider.GetUserResponse = {
                                Username: attribs.userId as string,
                                UserAttributes: [
                                    {Name: 'custom:role',Value: attribs.role!.toString()},
                                    {Name: 'email', Value: attribs.email}
                                ]
                            }
                            callback(null,resp)
                        } else {
                            callback({} as AWSError,null);
                        }
                    })
                }
            })
        })
        it('Should get Identity Attribs as a Claim when a valid token is passed.', async () => {
            const attribs = await svc.verifyToken('token1');
            expect(attribs.userId).toEqual(tokenMap['token1'].userId);
            expect(attribs.email).toEqual(tokenMap['token1'].email);
            expect(attribs.role).toEqual(tokenMap['token1'].role?.toString());
        });

        it('Should throw error when an invalid token is passed.', async () => {
           await expect (svc.verifyToken('invalid-token')).rejects.toBeDefined();
        })

        afterAll(()=>{
            jest.clearAllMocks();
        })
    })
})