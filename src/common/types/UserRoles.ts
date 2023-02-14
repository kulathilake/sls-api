
export enum Roles {
    ADMIN="ADMIN",
    REGULAR="REGULAR"
}

export type UserRolePermissions = {
    resources: {
        resourceType: string | '*';
        permissions: string[];
    }[];
};
