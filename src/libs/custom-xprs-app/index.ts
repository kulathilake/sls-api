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


export function useCustomExpressApp(basePath:string) {
    Container.set('BASE_PATH',basePath);
    const acl = Container.get(AccessControlImpl);
    const app = express();
    app.use(bodyparser.json());
    app.use(accesscontrol);

    return {
        app:{
            ...app,
            useAction: acl.addAction.bind(acl)
        },
        handler: serverless(app,{
            basePath
        })
    }
}
