export type Action = {
    name: string;
    path: string;
    method: string;
    resource: string;
    requiredPermissions: string[][]
};
