define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PubSub {
        constructor() {
            this.subs = {};
        }
        unSub(k, ref) {
            const i = this.subs[k].indexOf(ref);
            this.subs[k].splice(i, 1);
        }
        sub(k, fun) {
            if (this.subs[k]) {
                this.subs[k].push(fun);
            }
            else {
                this.subs[k] = [fun];
            }
            return fun;
        }
        pub(k, o) {
            (this.subs[k] || []).forEach(sub => sub(o));
        }
        __name__() { return 'PubSub'; }
    }
    exports.PubSub = PubSub;
});
//# sourceMappingURL=PubSub.js.map