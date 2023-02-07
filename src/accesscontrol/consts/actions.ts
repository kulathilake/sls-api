import { Action } from "../types/acl.types";
import { ADMIN_CREATE_ANY, ADMIN_REMOVE_ANY, ADMIN_UPDATE_ANY, CREATE_CREATOR_RESOURCE, UPDATE_CREATOR_RESOURCE } from "./permissions";

export const actions: Action[] = [
    /** Recipe Actions */
    {
        name: 'Recipe: Create',
        method: 'POST',
        path: '/admin/recipe/create',
        requiredPermissions: [[CREATE_CREATOR_RESOURCE], [ADMIN_CREATE_ANY]]
    },
    {
        name: 'Recipe: View Many',
        method: 'GET',
        path: '/admin/recipe/',
        requiredPermissions: []
    },
    {
        name:'Recipe: Update',
        method: 'PUT',
        path: '/admin/recipe/:id',
        requiredPermissions: [[UPDATE_CREATOR_RESOURCE], [ADMIN_UPDATE_ANY]]
    },
    {
        name: 'Recipe: Remove',
        method: 'DELETE',
        path: '/admin/recipe/:id',
        requiredPermissions: [[ADMIN_REMOVE_ANY]]
    }
]