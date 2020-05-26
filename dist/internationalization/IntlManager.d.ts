export declare function intl(k: string, par?: any): string;
/**
 * The internationalization manager.
 */
export declare class IntlManager {
    static instance: IntlManager;
    private initialized;
    private bundle;
    private lang;
    constructor();
    load(resources: string[], lang?: string): void;
    translate(k: string, par?: any): string;
}
//# sourceMappingURL=IntlManager.d.ts.map