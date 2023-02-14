
export enum Roles {
    ADMIN= "ADMIN",
    REGULAR= "REGULAR",
}

export type UserRolePermissions = {
    resources: Array<{
        resourceType: string | "*";
        permissions: string[];
    }>;
};
