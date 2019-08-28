define(["require", "exports", "ferrum-plumbing"], function (require, exports, ferrum_plumbing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalReducerRegistry {
        static registerReducer(name, reducer) {
            GlobalReducerRegistry._registeredReducers[name] = reducer;
        }
        static registerContainer(injectable, reducer) {
            const name = injectable.__name__();
            GlobalReducerRegistry._registeredReducers[name] = reducer;
        }
        static containerReducer(type) {
            const name = ferrum_plumbing_1.Container._name(type);
            return (appState, state, action) => {
                return this.reducer(name)(appState, state, action);
            };
        }
        static chainReducers(types) {
            return (appState, state, action) => {
                let s = state;
                for (let t of types) {
                    const name = ferrum_plumbing_1.Container._name(t);
                    s = this.reducer(name)(appState, s, action);
                }
                return s;
            };
        }
        static reducer(name) {
            return GlobalReducerRegistry._registeredReducers[name] || ((s) => s);
        }
    }
    GlobalReducerRegistry._registeredReducers = {};
    exports.GlobalReducerRegistry = GlobalReducerRegistry;
    /**
     * DO NOT USE THIS. Only for legacy use-cases
     */
    class GlobalContainer {
        static instance() {
            if (!GlobalContainer._instance) {
                throw new Error('Container is not initialized');
            }
            return GlobalContainer._instance;
        }
        static init(container) {
            GlobalContainer._instance = container;
        }
    }
    exports.GlobalContainer = GlobalContainer;
});
//# sourceMappingURL=GlobalContainer.js.map