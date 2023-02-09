/**
 * Function for troubleshooting and god mode testing.
 * NOT TO BE DEPLOYED TO PRODUCTION!
 */

import serverless from 'serverless-http';
import express from 'express';
import bodyparse from 'body-parser';
import { DynamodbCRUD } from '../../libs/datarepo/impl/dynamodb.crud.repo';
import { MockDomainModel } from '../../libs/datarepo/__mock__/MockDomain.model';
const app = express();

app.use(bodyparse.json());

app.post('/mapper/create',(req,res,next)=>{
    const data = req.body;
    const repo = new DynamodbCRUD(MockDomainModel);
    const payload = Object.assign(new MockDomainModel(),data)
    console.log(payload);
    repo.create(payload)
    .then(response => {
        res.send({
            saved: response,
            recieved: data
        });
    })
    .catch(e=>{
        res.status(500).json({error:e})
    })
})

app.post('/mapper/findPageByQuery/',(req,res,next)=>{
    const repo = new DynamodbCRUD(MockDomainModel);
    repo.findPageByQuery(req.body.query,req.body.page)
    .then(r => {
        res.send(r);
    })
    .catch(e=>{
        res.status(500).json({error:e.message})
    })
})

export const handler = serverless(app,{
    basePath: '/troubleshoot/dynamodb'
});