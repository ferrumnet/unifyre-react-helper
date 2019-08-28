define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ErrorUtils {
        static translate(e) {
            if (e.indexOf('api.model.ApiError:') >= 0) {
                return e.split('api.model.ApiError:')[1];
            }
            return e;
        }
        static fromError(e) {
            return ErrorUtils.translate(e.message ?
                ErrorUtils.cleanError(e.message) : e.toString());
        }
        static stringify(e) {
            if (typeof e === 'object' && e !== null) {
                return JSON.stringify(e, Object.getOwnPropertyNames(e));
            }
            else
                return JSON.stringify(e);
        }
        static cleanError(error) {
            if ((error || '').indexOf(':') >= 0) {
                const afterColon = error.substr(error.indexOf(':') + 1).trim();
                if (afterColon.indexOf(':') >= 0) {
                    return afterColon.substr(0, afterColon.indexOf(':')).trim();
                }
                else {
                    return afterColon;
                }
            }
            return error;
        }
    }
    exports.ErrorUtils = ErrorUtils;
    class ApiError {
        constructor(status, statusText, message) {
            this.status = status;
            this.statusText = statusText;
            this.message = message;
        }
    }
    exports.ApiError = ApiError;
});
//# sourceMappingURL=ErrorUtils.js.map