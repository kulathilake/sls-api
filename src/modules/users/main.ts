import Container from "typedi";
import {useCustomExpressApp } from "../../libs/custom-xprs-app";
import { User } from "./user.model";
import { UserService } from "./user.service";
const {app,handler:_handler} = useCustomExpressApp('/user');
const service = Container.get(UserService);

/** Lists all users */
app.registerApiAction({resource: 'user', name:'User:Get',method:'GET',path:'/user',requiredPermissions:[]});
app.get('/',(req,res,next)=>{
    const query = req.query as {k?:string,v?:string|number|boolean, i?: string, from?: string, size?: number, fromField?: string};
    service.listActiveUsers({
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
app.registerApiAction({resource: 'user',name:'User:Get',method:'GET',path:'/user/:id',requiredPermissions:[]});
app.get('/:id',(req,res)=>{
    service.findUserById(req.params.id)
    .then(d=>{
        res.json(d)
    })
    .catch(e=>{
        const status = (e.message.match('User:Service:FindUserById: Not Found'))? 404 : 500
        res.status(status).json({
            error: e.message
        });
    })
})

/** Create a user */
app.registerApiAction({resource: 'user',name:'User:CREATE',method:'POST',path:'/user',requiredPermissions:[]});
app.post('/',(req,res,next)=>{
    const payload = Object.assign(new User(),req.body)
    service.createNewUser(payload)
    .then(d=>{
        res.status(201).json(d);
    })
    .catch(e=>{
        res.status(500).json({
            error: e.message
        });
    })
})

/** Update a user */
app.registerApiAction({resource: 'user', name:'User:UPDATE', method:'PUT',path:'/user/:id', requiredPermissions:[]});
app.put('/:id', (req,res,next)=> {
    service.updateUser(req.params.id, req.body)
    .then(d=>{
        res.status(200).json(d);
    })
    .catch(e=>{
        res.status(500).json({
            error: e.message
        });
    })
})


export const handler = _handler;