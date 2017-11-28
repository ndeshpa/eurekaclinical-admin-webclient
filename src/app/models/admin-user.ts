export class AdminUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    organization: string;
    password: string;
    verifyPassword: string;
    verifyEmail: string;
    email: string;
    title: string;
    department: string;
    providerUsername: string;
    authenticationMethod: string;
    oauthProvider: string;
    roles: any;
    active: boolean;
    verified: boolean;
    created: Date;
    lastLogin: Date;
    type: string;
    loginType: string;
    verificationCode: string;
    passwordExpiration: any;
}

