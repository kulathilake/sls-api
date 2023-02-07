import { PermissionGroup } from "../types/acl.types";

export const ADMIN_CREATE_ANY = 'ADMIN_CREATE_ANY';
export const ADMIN_VIEW_ANY = 'ADMIN_VIEW_ANY';
export const ADMIN_UPDATE_ANY = 'ADMIN_UPDATE_ANY';
export const ADMIN_REMOVE_ANY = 'ADMIN_REMOVE_ANY';
export const CREATE_CREATOR_RESOURCE = 'CREATE_CREATOR_RESOURCE';
export const UPDATE_CREATOR_RESOURCE = 'UPDATE_CREATOR_RESOURCE';
export const REMOVE_CREATOR_RESOURCE = 'REMOVE_CREATOR_RESOURCE';
export const VIEW_CREATOR_RESOURCE = 'VIEW_CREATOR_RESOURCE';

const permissionGroups: { [s: string]: PermissionGroup } = {
    /** Role based permission groups */
    ADMIN: {
        permissionScope: 'ALL',
        permissions: [
            ADMIN_CREATE_ANY, 
            ADMIN_VIEW_ANY, 
            ADMIN_UPDATE_ANY, 
            ADMIN_REMOVE_ANY
        ],
        includeGroups: [],
    },
    CREATOR: {
        permissionScope: 'SHARED_OR_OWN',
        permissions: [],
        includeGroups: [
            'CREATOR_RESOURCE'
        ]
    },
    CUSTOMER: {
        permissionScope: 'OWN',
        permissions: [],
        includeGroups: []
    },

    /** Feature based permission groups */
    CREATOR_RESOURCE: {
        permissions: [
            CREATE_CREATOR_RESOURCE,
            UPDATE_CREATOR_RESOURCE,
            REMOVE_CREATOR_RESOURCE,
            VIEW_CREATOR_RESOURCE,
        ],
        includeGroups: []
    }

}

/**
 * Recursively returns the permissions granted to a given 
 * permission group. (assuming permissions from the 
 * `includedGroups` if any) 
 * @param groupName 
 * @returns 
 */
export function getPermissionsFromGroup(groupName: string): string[] {
    const perms: string[] = [];
    const group = permissionGroups[groupName];
    if (group) {
        perms.push(...group.permissions);
        if (group.includeGroups && group.includeGroups.length) {
            group.includeGroups.forEach(grp => {
                perms.push(...getPermissionsFromGroup(grp))
            })
        }
        return perms;
    } else {
        throw new Error('ACL:permissions:getPermissionsFromGroup: Invalid Group Name');
    }
}

/**
 * Gets the scope through which any permission granted to a role is applicable
 * based on resource ownership.
 * @param role 
 * @returns Permission Scope
 */
export function getPermissionScopeForRole(role:string): 'OWN' | 'ALL' | 'SHARED_OR_OWN' {
    const group = permissionGroups[role];
    if(group && group.permissionScope) {
        return group.permissionScope;
    }else{
        throw new Error('ACL:permissions:getPermissionScopeForRole: Invalid role or undefined permission scope')
    }
}