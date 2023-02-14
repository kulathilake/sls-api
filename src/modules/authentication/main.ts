import Container from "typedi";
import { CognitoIdentitySvc } from "../../libs/identity/service_impl/cognito.identity.serviceImpl";
import { useCustomExpressApp } from "../../libs/custom-xprs-app";
import { UserService } from "../users/user.service";
import { SignUpRequest } from "./signup.request.dto";
import { Roles } from "../../common/types/UserRoles";
import { User } from "../users/user.model";

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

app.post('/signin',()=>{

});


export const handler = _handler;