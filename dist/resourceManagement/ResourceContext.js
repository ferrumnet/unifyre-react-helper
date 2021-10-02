"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceContext = exports.ResourceConstantProvider = void 0;
const react_1 = require("react");
const types_1 = require("../theme/types");
class ResourceConstantProvider extends types_1.ConstantProvider {
}
exports.ResourceConstantProvider = ResourceConstantProvider;
/**
 * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
 * to create a constant provider
 */
exports.ResourceContext = react_1.createContext(new ResourceConstantProvider('empty', {}));
//# sourceMappingURL=ResourceContext.js.map