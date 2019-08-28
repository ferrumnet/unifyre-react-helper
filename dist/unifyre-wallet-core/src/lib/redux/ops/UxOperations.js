var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../common/Log", "../ReduxUtils", "../actions/Actions", "../../common/ErrorUtils"], function (require, exports, Log_1, ReduxUtils_1, Actions_1, ErrorUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UxOperations {
        constructor(pubSub) {
            this.pubSub = pubSub;
        }
        __name__() { return 'UxOperations'; }
        notify(type, message) {
            Log_1.Log.info('About to notify', message);
            this.pubSub.pub('notificationMessage', { type: type, message: message });
            return;
        }
        notifyError(e) {
            this.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
        }
        okDialog(title, message) {
            this.pubSub.pub('notificationDialog', { title, message });
            return;
        }
        wrapAsync(fun, waiting = true) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (waiting) {
                        ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.WAITING, {}));
                    }
                    return yield fun();
                }
                catch (e) {
                    Log_1.Log.info('Error ', e);
                    if (waiting) {
                        this.notify('error', ErrorUtils_1.ErrorUtils.fromError(e));
                    }
                }
                finally {
                    if (waiting) {
                        ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.FINISH_WAITING, {}));
                    }
                }
                return;
            });
        }
        static isOffline() {
            return ReduxUtils_1.ReduxUtils.getState().data.config.isOffline;
        }
    }
    exports.UxOperations = UxOperations;
});
//# sourceMappingURL=UxOperations.js.map