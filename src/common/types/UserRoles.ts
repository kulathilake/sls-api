
export enum Roles {
    ADMIN,
    REGULAR
}

export type UserRolePermissions = {
    resources: {
        resourceType: string | '*';
        permissions: string[];
    }[];
};
