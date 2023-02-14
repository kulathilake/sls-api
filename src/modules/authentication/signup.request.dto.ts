import { Roles } from "../../common/types/UserRoles";

export interface SignUpRequest {
    email: string,
    password: string,
    role?: Roles
}