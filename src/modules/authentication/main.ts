import Container from "typedi";
import { CognitoIdentitySvc } from "../../libs/identity/service_impl/cognito.identity.serviceImpl";
import { useCustomExpressApp } from "../../libs/custom-xprs-app";
import { UserService } from "../users/user.service";

/**
 * Endpoint exposing authentication tasks
 */
const {app,handler:_handler} = useCustomExpressApp('/auth',false);

const userSVC = Container.get(UserService);
const authSVC = Container.get(CognitoIdentitySvc);

app.post('/signup',()=>{

});

app.post('/signin',()=>{

});


export const handler = _handler;