import { AppUser } from './redux/AppState';
import { Injectable } from 'ferrum-plumbing';
export declare class Context implements Injectable {
    user: AppUser;
    session: string;
    adminSession: string;
    _config: {
        [k: string]: string;
    };
    id: string;
    constructor();
    __name__(): string;
    config(key: string): string;
    signOut(): Promise<void>;
    getSession(): string;
    userIsSignedIn(): boolean;
    getAdminSession(): string;
    setSession(session: string): void;
    setAdminSession(adminSession: string): void;
    getRedirectUrl(): any;
}
//# sourceMappingURL=Context.d.ts.map