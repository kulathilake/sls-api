import Container from "typedi";
import { ADMIN_UPDATE_ANY, ADMIN_VIEW_ANY, CREATE_OWN_RESOURCE, UPDATE_OWN_RESOURCE, VIEW_OWN_RESOURCE } from "../../libs/accesscontrol/consts/permissions";
import { useCustomExpressApp } from "../../libs/custom-xprs-app";
import { Cycle } from "./cycle.model";
import { CycleService } from "./cycle.service";

const {app, handler:_hanlder} = useCustomExpressApp('/cycles');

const cycleSvc = Container.get(CycleService);

app.registerApiAction({
    name: 'Cycle:User:Get',
    resource: 'cycle',
    method: 'GET',
    path: '/cycles/:user',
    requiredPermissions: [
        [VIEW_OWN_RESOURCE],
        [ADMIN_VIEW_ANY]
    ]
})
app.get('/:user',async (req,res,next)=>{
    try {
        const user = req.params.user;
        const cycle = await cycleSvc.getUserCycles(user,{size:10});
        res.json(cycle);
    } catch (error) {
        res.status(500).json({
            error: (error as any).message,
        });
    }
});

app.registerApiAction({
    name: 'Cycle:User:GetActive',
    resource: 'cycle',
    method: 'GET',
    path: '/cycles/:user/active',
    requiredPermissions: [
        [VIEW_OWN_RESOURCE],
        [ADMIN_VIEW_ANY]
    ]
})
app.get('/:user/active',async (req,res,next)=>{
    try {
        const user = req.params.user;
        const cycle = await cycleSvc.getActiveCycle(user);
        res.json(cycle);
    } catch (error) {
        res.status(500).json({
            error: (error as any).message,
        });
    }
});

app.registerApiAction({
    name: 'Cycle:User:Create',
    resource: 'cycle',
    method: 'POST',
    path: '/cycles/:user',
    requiredPermissions: [
        [CREATE_OWN_RESOURCE],
    ]
})
app.post('/:user/',async (req,res,next)=>{
    try {
        const user = req.params.user;
        const payload = req.body as Cycle;
        const cycle = await cycleSvc.createCycle(user,payload);
        res.json(cycle);
    } catch (error) {
        res.status(500).json({
            error: (error as any).message,
        });
    }
});

app.registerApiAction({
    name: 'Cycle:User:Create',
    resource: 'cycle',
    method: 'PUT',
    path: '/cycles/:user/:cycle',
    requiredPermissions: [
        [UPDATE_OWN_RESOURCE],
        [ADMIN_UPDATE_ANY]
    ]
})
app.put('/:user/:cycle',async (req,res,next)=>{
    try {
        const user = req.params.user;
        const cycle = req.params.cycle;
        const payload = req.body as Cycle;
        const updateRes = await cycleSvc.updateUserCycle(cycle,user,payload);
        res.json(updateRes);
    } catch (error) {
        res.status(500).json({
            error: (error as any).message,
        });
    }
})



export const handler = _hanlder