define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Validation {
        static isTrue(predicate, message) {
            if (!predicate) {
                throw new Error(message);
            }
        }
        static notEmpty(v, message) {
            if (!v || !v.length) {
                throw new Error(message);
            }
        }
    }
    exports.Validation = Validation;
});
//# sourceMappingURL=Valitation.js.map