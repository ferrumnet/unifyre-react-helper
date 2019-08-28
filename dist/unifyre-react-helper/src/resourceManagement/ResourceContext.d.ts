/// <reference types="react" />
import { ConstantProvider, BaseConstValue } from "../theme/types";
export declare type ResourceConstant = {
    type: 'string' | 'node';
    value: any;
};
export declare class ResourceConstantProvider extends ConstantProvider<ResourceConstant, BaseConstValue<ResourceConstant>> {
}
/**
 * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
 * to create a constant provider
 */
export declare const ResourceContext: import("react").Context<ResourceConstantProvider>;
//# sourceMappingURL=ResourceContext.d.ts.map