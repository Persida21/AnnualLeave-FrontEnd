import { Role } from "./role";

export interface User {

    id: number;
    userName : string,
    password: string;
    name: string;
    lastName: string;
    roles: Set<Role>;
    email: string;
    active: boolean;
}
