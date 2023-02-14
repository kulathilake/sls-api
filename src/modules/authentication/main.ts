import Container from "typedi";
import { CognitoIdentitySvc } from "../../libs/identity/service_impl/cognito.identity.serviceImpl";
import { useCustomExpressApp } from "../../libs/custom-xprs-app";
import { UserService } from "../users/user.service";
import { SignUpRequest } from "./dtos/signup.request.dto";
import { Roles } from "../../common/types/UserRoles";
import { User } from "../users/user.model";
import { EmailConfirmRequest } from "./dtos/emailConfirm.request.dto";
import { EmailSignInRequest } from "./dtos/EmailSignIn.request.dto";
import 'reflect-metadata';

/**
 * Endpoint exposing authentication tasks
 */
const {app,handler:_handler} = useCustomExpressApp('/auth',false);

const userSVC = Container.get(UserService);
const authSVC = Container.get(CognitoIdentitySvc);

app.post('/signup',async (req,res,next)=>{
    try {
        const {email,password,role} = req.body as SignUpRequest;
        const authRes = await authSVC.signUpWithEmail(email,password,role||Roles.REGULAR)
        const userPayload = Object.assign(new User(), {
            userid: authRes.userId,
            permissions: authRes.permissions,
            createdBy: authRes.userId,
            email: authRes.email
        })
        const dbRes = await userSVC.createNewUser(userPayload)
    
        if(dbRes){
            res.status(201).json(dbRes);
        }else{
            const e = new Error(`Authentication:Signup:Unknown Error when saving to datastore`)
            res.status(500).json({
                error: e.message
            });
        }
    } catch (error) {
        const e = new Error(`Authentication:Signup:${(error as any).message}`)
        res.status(500).json({
            error: e.message
        });
    }

});

app.post('/:id/confirm', async (req,res,next) => {
    try {
        const userId = req.params.id;
        const {email,code} = req.body as EmailConfirmRequest;
        let confirmRes:boolean;
        try {
            confirmRes = await authSVC.verifyEmailConfirmationCode(email,code)            
        } catch (error) {
            if((error as Error).message === 'User cannot be confirmed. Current status is CONFIRMED'){
                confirmRes = true;
            }else {
                throw error;
            }
        } 
        if(confirmRes){
            const updateRes = await userSVC.updateUser(userId,{isEmailVerified:true});
            if(updateRes){
                res.status(200).send('OK');
            }else{
                const e = new Error("Authentication:Confirm:User Confirmed but failed to persist status");
                res.status(500).json({
                    error: e.message
                })
            }
        } else {
            const e = new Error('Authentication:Confirm:Unknown Error Failed to Confirm');
            res.status(500).json({
                error: e.message
            })
        }

    } catch (error) {
        res.status(500).json({
            error: `Authentication:Confirm:${(error as any).message}`
        })
    }
})

app.post('/signin',async (req,res)=>{
    try {
        const {email,password} = req.body as EmailSignInRequest;
        const signInRes = await authSVC.signInWithEmail(email,password);
        const userAttribs = await authSVC.verifyToken(signInRes.accessToken);
        res.json({...signInRes, user: userAttribs});
    } catch (error) {
        res.status(500).json({
            error: `Authentication:SignIn:${(error as any).message}`
        })
    }
});

app.post('/refresh',async (req,res)=>{
    try {
        const {refreshToken} = req.body as {refreshToken: string};
        const refreshRes = await authSVC.refreshAccessToken(refreshToken);
        if( refreshRes ) {
            res.json(refreshRes);
        } else {
            throw new Error("Authentication:Refresh:Unknown Error")
        }
    } catch (error) {
        res.status(500).json({
            error: `Authentication:Refresh:${(error as any).message}`
        })
    }
});

export const handler = _handler;