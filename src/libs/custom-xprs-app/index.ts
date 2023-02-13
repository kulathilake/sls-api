/**
 * a custom express app generator function1
 */
import serverless from 'serverless-http';
import express from 'express';
import bodyparser from 'body-parser';
import { accesscontrol } from '../accesscontrol/middleware/acl.middleware';
import Container from 'typedi';
import 'reflect-metadata';
import { AccessControlImpl } from '../accesscontrol/service/AccessControl.service';

/**
 * Creates a custom version of Express app and returns a serverless wrapped
 * app with the original app
 * @param basePath base path of the app
 * @param useACL use Access Control Middleware. Set to false when using API Gateway authorizers
 * @returns {app: ExpressApp, handler: Serverless Express handler}
 */
export function useCustomExpressApp(basePath:string, useACL=true) {
    Container.set('BASE_PATH',basePath);
    const acl = Container.get(AccessControlImpl);
    const app = express();
    app.use(bodyparser.json());
    if(useACL){
        app.use(accesscontrol);
    }
    return {
        app:{
            ...app,
            registerApiAction: acl.addAction.bind(acl)
        },
        handler: serverless(app,{
            basePath
        })
    }
}
