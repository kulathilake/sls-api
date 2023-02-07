import { Action } from "../types/acl.types";
import { permissionGroups } from "./permissions";

export const actions: Action[] = [
    {
        name: 'Admin:create-recipe',
        method: 'POST',
        path: '/admin/recipe/create',
        requiredPermissions: ['CREATE_CREATOR_RESOURCE', 'ADMIN_CREATE_ANY']
    }
]