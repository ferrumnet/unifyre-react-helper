var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./redux/AppState"], function (require, exports, AppState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Context {
        constructor() {
            this.user = AppState_1.dummyAppUser;
            this.session = '';
            this.adminSession = '';
            this._config = {};
            this.id = '___' + Date.now();
        }
        __name__() { return 'Context'; }
        config(key) {
            if (!(key in this._config)) {
                throw new Error('Config not found:' + key);
            }
            return this._config[key];
        }
        signOut() {
            return __awaiter(this, void 0, void 0, function* () {
                this.session = '';
                this.adminSession = '';
            });
        }
        getSession() {
            return this.session;
        }
        userIsSignedIn() {
            return !!this.session;
        }
        getAdminSession() {
            return this.adminSession;
        }
        setSession(session) {
            this.session = session;
        }
        setAdminSession(adminSession) {
            this.adminSession = adminSession;
        }
        getRedirectUrl() {
            // @ts-ignore
            return window.mobileAppRedirectUrl || '';
        }
    }
    exports.Context = Context;
});
//# sourceMappingURL=Context.js.map