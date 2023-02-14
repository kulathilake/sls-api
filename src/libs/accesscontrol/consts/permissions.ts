import { UserRolePermissions as UserRolePermission } from "../../../common/types/UserRoles";

export const ADMIN_CREATE_ANY = "ADMIN_CREATE_ANY";
export const ADMIN_VIEW_ANY = "ADMIN_VIEW_ANY";
export const ADMIN_UPDATE_ANY = "ADMIN_UPDATE_ANY";
export const ADMIN_REMOVE_ANY = "ADMIN_REMOVE_ANY";
export const VIEW_PUBLIC_RESOURCE = "VIEW_PUBLIC_RESOURCE";
export const VIEW_SHARED_RESOURCE = "VIEW_SHARED_RESOURCE";
export const VIEW_OWN_RESOURCE = "VIEW_OWN_RESOURCE";
export const UPDATE_OWN_RESOURCE = "UPDATE_OWN_RESOURCE";
export const REMOVE_OWN_RESOURCE = "REMOVE_OWN_RESOURCE";

const userRolePermissions: { [s: string]: UserRolePermission } = {
    /** Role based permission groups */
    ADMIN: {
        resources: [
            {
                resourceType: "*",
                permissions: [
                    ADMIN_CREATE_ANY,
                    ADMIN_VIEW_ANY,
                    ADMIN_UPDATE_ANY,
                    ADMIN_REMOVE_ANY,
                ],
            },
            {
                resourceType: "identity",
                permissions: [

                ],
            },
        ],
    },

    REGULAR: {
        resources: [
            {
                resourceType: "user",
                permissions: [
                    VIEW_PUBLIC_RESOURCE,
                    VIEW_OWN_RESOURCE,
                    UPDATE_OWN_RESOURCE,
                ],
            },
        ],
    },

};

/**
 * Recursively returns the permissions granted to a given
 * permission group. (assuming permissions from the
 * `includedGroups` if any)
 * @param groupName
 * @returns
 */
export function getPermissionsOnResourceType(userRole: string, resource: string): string[] {
    const perms: string[] = [];
    const rolePerms = userRolePermissions[userRole];
    if (rolePerms) {
        const wildCardPerms = rolePerms.resources.find((r) => r.resourceType === "*");
        if (wildCardPerms){
            return wildCardPerms.permissions;
        } else {
            const perms = rolePerms.resources.find((r) => r.resourceType === resource)?.permissions;
            if (perms){
                return perms;
            }else {
                throw new Error("ACL:permissions:getPermissionsFromGroup: No Perms on Resource Type");
            }
        }
        return perms;
    } else {
        throw new Error("ACL:permissions:getPermissionsFromGroup: Invalid User Role");
    }
}

export function getPermissionOnRole(userRole: string): UserRolePermission {
    const role = userRolePermissions[userRole];
    if (role) return role;
    throw new Error("ACL:permissions:getPermissionOnRole: Invalid User Role");
}
