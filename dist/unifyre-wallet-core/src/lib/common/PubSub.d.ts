import { Injectable } from "ferrum-plumbing";
export declare type PubSubEvent = 'pageRendered' | 'notificationMessage' | 'notificationDialog' | 'onWebPageScroll' | 'webPageOnNavigate' | 'wsOpen' | 'wsClose' | 'wsMessage' | 'openedByDeepLink' | 'contactManagerInitialized' | 'keyboardVisibilityChanged' | 'onSignInSessionChanged' | 'signedOut' | 'twoFaSubmit' | 'sellItemRequested' | 'pinUpdated' | 'validatePin' | 'refreshNotifications' | 'dashboardModeChanged' | 'analyticsEvent' | 'openUrl' | 'userOutOfAnonymous' | 'intlManagerLoaded';
export declare class PubSub implements Injectable {
    private subs;
    unSub(k: PubSubEvent, ref: any): void;
    sub(k: PubSubEvent, fun: (o: any) => void): (o: any) => void;
    pub(k: PubSubEvent, o: any): void;
    __name__(): string;
}
//# sourceMappingURL=PubSub.d.ts.map