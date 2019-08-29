import {createContext} from "react";
import {ConstantProvider, BaseConstValue} from "../theme/types";

export type ResourceConstantValue = { type: 'string' | 'node', value: any };

export type ResourceConstant = {[ k: string ]: ResourceConstantValue}

export class ResourceConstantProvider extends ConstantProvider<
    ResourceConstantValue, BaseConstValue<ResourceConstantValue>> {}


/**
 * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
 * to create a constant provider
 */
export const ResourceContext = createContext<ResourceConstantProvider>(
    new ResourceConstantProvider('empty', {}));
