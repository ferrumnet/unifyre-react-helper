define(["require", "exports", "react", "../theme/types"], function (require, exports, react_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ResourceConstantProvider extends types_1.ConstantProvider {
    }
    exports.ResourceConstantProvider = ResourceConstantProvider;
    /**
     * Use ConstantBuilder.create<ResourceConstant, BaseConstValue<ResourceConstant>()
     * to create a constant provider
     */
    exports.ResourceContext = react_1.createContext(new ResourceConstantProvider('empty', {}));
});
//# sourceMappingURL=ResourceContext.js.map