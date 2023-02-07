export type Action = {
    name: string;
    path: string;
    method: string;
    requiredPermissions: string[][]
}

export type RolePermissions = {
    role: string,
    permissions: string[]
}

export type PermissionGroup = {
    permissions: string[];
    includeGroups?: string[];
    permissionScope?: 'OWN' | 'ALL' | 'SHARED_OR_OWN'
}