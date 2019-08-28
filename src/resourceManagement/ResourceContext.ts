import {createContext} from "react";
import {ConstantProvider, BaseConstValue} from "../theme/types";

export type ResourceConstant = { type: 'string' | 'node', value: any };

export class ResourceConstantProvider extends ConstantProvider<ResourceConstant, BaseConstValue<ResourceConstant>> {}


/**
 * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
 * to create a constant provider
 */
export const ResourceContext = createContext<ResourceConstantProvider>(
    new ResourceConstantProvider('empty', {}));
