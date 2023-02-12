import Container from "typedi";
import {useCustomExpressApp } from "../../libs/custom-xprs-app";
import { User } from "./user.model";
import { UserRepo } from "./user.repo";
const {app,handler:_handler} = useCustomExpressApp('/user');
const repo = Container.get(UserRepo);

/** Lists all users */
app.useAction({resource: 'user', name:'User:Get',method:'GET',path:'/user',requiredPermissions:[]});
app.get('/',(req,res,next)=>{
    const query = req.query as {k?:string,v?:string|number|boolean, i?: string, from?: string, size?: number, fromField?: string};
    repo.findPageByQuery({
        keyAttribName:  query.k || 'isRemoved',
        keyAttribValue: query.v || 'false',
        useIndex: query.i || 'activeUsers'
    },{
        size: query.size || 10,
        from: query.from,
        fromField: query.fromField
    }) 
    .then(d=>{
        res.json(d);
    })
    .catch(e=>{
        res.status(500).json({
            error: e.message
        });
    })
})

/** Get user by id */
app.useAction({resource: 'user',name:'User:Get',method:'GET',path:'/user/:id',requiredPermissions:[]});
app.get('/:id',(req,res)=>{
    repo.findById(req.params.id)
    .then(d=>{
        res.json(d)
    })
    .catch(e=>{
        res.send({
            error: e.message
        });
    })
})

/** Create a user */
app.useAction({resource: 'user',name:'User:CREATE',method:'POST',path:'/user',requiredPermissions:[]});
app.post('/',(req,res,next)=>{
    const payload = Object.assign(new User(),req.body)
    repo.create(payload)
    .then(d=>{
        res.status(201).json(d);
    })
    .catch(e=>{
        res.status(500).json({
            error: e.message
        });
    })
})


export const handler = _handler;