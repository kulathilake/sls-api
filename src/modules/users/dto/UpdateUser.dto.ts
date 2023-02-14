import { UserRolePermissions } from "../../../common/types/UserRoles"

export interface UpdateUserDto {
    isEmailVerified?: boolean
    permissions?: UserRolePermissions
    firstName?:string
}
