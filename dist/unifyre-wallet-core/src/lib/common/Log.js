define(["require", "exports", "./AppEnv", "../redux/ReduxUtils", "../redux/actions/Actions"], function (require, exports, AppEnv_1, ReduxUtils_1, Actions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-ignore
    const con = window ? window.console : console;
    class DebugLoger {
        constructor() {
            this.info = console.log.bind(con);
            this.error = console.error.bind(con);
            this.warn = console.warn.bind(con);
        }
    }
    // TODO: Implement a propper logger
    class ProdLogger {
        info() { }
        error() { }
        warn() { }
    }
    class WebViewLogger {
        info(...args) {
            this.sendLog('info', args);
        }
        warn(...args) {
            this.sendLog('warn', args);
        }
        error(...args) {
            this.sendLog('error', args);
        }
        sendLog(logType, args) {
            // const err = new Error();
            // const stack = (err.stack || '').toString().substr(0, logType === 'error' ? undefined : 250).split(/\r\n|\n/);
            let jsonMessage = JSON.stringify({ type: 'LOG', log: logType, payload: { 'error': 'Error converting to JSON' } });
            const val = {
                type: 'LOG',
                log: logType,
                // stack: stack,
                payload: args,
            };
            try {
                jsonMessage = JSON.stringify(val);
            }
            catch (e) {
                // gobble
            }
            ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.LOG, jsonMessage));
        }
    }
    exports.Log = new DebugLoger();
    // Set up log once everything is initialized
    setTimeout(() => {
        // PubSub.instance.pub('remoteLog', { type: 'LOG',
        //     payload: 'Using logger based on dev' + AppEnv.isDev() + ', sa ' + AppEnv.isStandalone() + ', na ' + AppEnv.isNative() });
        if (AppEnv_1.AppEnv.isDev()) {
            if (!AppEnv_1.AppEnv.isStandalone() && !AppEnv_1.AppEnv.isNative()) {
                // PubSub.instance.pub('remoteLog', { type: 'LOG', payload: 'Using webview logger' });
                exports.Log = new WebViewLogger();
            }
            else {
                // PubSub.instance.pub('remoteLog', { type: 'LOG', payload: 'Do nothing' });
                // Nothing
            }
        }
        else {
            // PubSub.instance.pub('remoteLog', { type: 'LOG', payload: 'Prod logger' });
            exports.Log = new ProdLogger();
        }
    });
});
//# sourceMappingURL=Log.js.map