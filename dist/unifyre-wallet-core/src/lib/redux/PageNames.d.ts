import { AppConfig, AppPage } from './AppState';
export declare const NATIVE_PAGES: Set<AppPage>;
export declare const COMMON_PAGES: Set<AppPage>;
export declare const BOTH_SIDE_PAGES: Set<AppPage>;
export declare const NATIVE_PAGES_WITH_TABBAR: Set<AppPage>;
export declare const NATIVE_PAGES_FULLSCREEN: Set<AppPage>;
export declare const PULL_TO_REFRESH_PAGES: Set<AppPage>;
export declare const OVERLAY_PAGES: Set<string>;
export declare const TRANSPARENT_PAGES: Set<string>;
export declare const ANONYMOUS_PAGES: Set<AppPage>;
export declare const PIN_SECURED_BUSINESS_PAGES: Set<string>;
export declare function isPullToRefreshEnabled(page: AppPage): boolean;
export declare function availableAnonymously(page: AppPage): boolean;
export declare function pinCodeRequired(config: AppConfig, page: AppPage): boolean;
export declare function dontGoAwayIfTransaction(page: AppPage): boolean;
//# sourceMappingURL=PageNames.d.ts.map