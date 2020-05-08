import { Time } from '@angular/common'

export interface User{
    id?: number;
    username: string;
    cnname: string;
    enname: string;
    password?: string;
    role_id: number;
    email: string;
    telephone: string;
    mobile: string;
    fax: string;
    address: string;
    post: string;
    token: string;
    expired: Date;
    status: number;
    ip: string;
}