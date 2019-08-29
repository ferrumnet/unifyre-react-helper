/// <reference types="react" />
import { ConstantProvider, BaseConstValue } from "../theme/types";
export declare type ResourceConstantValue = {
    type: 'string' | 'node';
    value: any;
};
export declare type ResourceConstant = {
    [k: string]: ResourceConstantValue;
};
export declare class ResourceConstantProvider extends ConstantProvider<ResourceConstantValue, BaseConstValue<ResourceConstantValue>> {
}
/**
 * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
 * to create a constant provider
 */
export declare const ResourceContext: import("react").Context<ResourceConstantProvider>;
//# sourceMappingURL=ResourceContext.d.ts.map