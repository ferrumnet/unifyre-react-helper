var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./ErrorUtils", "../redux/actions/Actions", "./AppEnv", "./Log", "./merics/MetricsService", "../redux/ReduxUtils"], function (require, exports, ErrorUtils_1, Actions_1, AppEnv_1, Log_1, MetricsService_1, ReduxUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KudiExchangeBackend = 'minimal-cloud.com';
    const selectedApiHost = 'l';
    const apiHostOptions = {
        'local': 'localhost',
        'genymotion': '10.0.3.2',
        'lan0': '192.168.1.221',
        'lan1': '192.168.1.218',
        'prod': exports.KudiExchangeBackend,
    };
    const apiHostShort = {
        'l': 'local',
        'g': 'genymotion',
        'l0': 'lan0',
        'l1': 'lan1',
        'p': 'prod',
    };
    exports.ApiHostName = apiHostOptions[apiHostShort[selectedApiHost]];
    exports.DevModeApi = exports.ApiHostName !== exports.KudiExchangeBackend;
    const secureHttp = exports.ApiHostName === exports.KudiExchangeBackend ? 'https' : 'http';
    // @ts-ignore
    const port = selectedApiHost === 'p' ? '' : ':9000';
    exports.apiUrl = `${secureHttp}://${exports.ApiHostName}${port}/api/`;
    exports.wsApiUrl = `ws://${exports.ApiHostName}${port}/ws`;
    Log_1.Log.info(`Server setup: ApiHostName: ${exports.ApiHostName}, DevModeApi: ${exports.DevModeApi}, secureHttp: ${secureHttp}, port: ${port}`);
    Log_1.Log.info(`Server setup: apiUrl: ${exports.apiUrl}, wsApiUrl: ${exports.wsApiUrl}`);
    class Api {
        constructor(storage, pubSub, context) {
            this.storage = storage;
            this.pubSub = pubSub;
            this.context = context;
            this.host = exports.apiUrl;
            this.wsHost = exports.wsApiUrl;
            Log_1.Log.info('Using server ', exports.apiUrl);
            this._setUpWebSockets();
            this.metric = MetricsService_1.metricsforModule('api');
        }
        __name__() { return 'Api'; }
        _setUpWebSockets() {
            try {
                // @ts-ignore
                this._wSocket = new WebSocket(this.wsHost);
                this._wSocket.onopen = () => {
                    Log_1.Log.info('Api.websocket: Connection opened!');
                    this.pubSub.pub('wsOpen', '');
                };
                this._wSocket.onclose = () => {
                    Log_1.Log.info('Api.websocket: Connection closed!');
                    this.pubSub.pub('wsClose', '');
                };
                // this._wSocket.addEventListener('error', (err: any) => { Log.error('Api.websocket', err); });
                this._wSocket.onerror = (e) => {
                    Log_1.Log.info('Api.websocket: Websocket error', (e || {}).message);
                };
                this._wSocket.onmessage = (m) => {
                    Log_1.Log.info('Api.websocket: Received message');
                    if (!m) {
                        Log_1.Log.info('Api.websocket: Received an empty message');
                    }
                    if (m.data) {
                        m = m.data;
                    }
                    if (m.toString().indexOf('{') < 0) {
                        Log_1.Log.info('Api.websocket: Received non-JSON message', m);
                        return;
                    }
                    this.pubSub.pub('wsMessage', JSON.parse(m));
                };
            }
            catch (e) {
                Log_1.Log.info('_setUpWebSockets error', e.toString());
            }
        }
        post(command, data, otpToken) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.fetchUrl(command, 'POST', {}, data, otpToken);
            });
        }
        offlineGet(command) {
            return __awaiter(this, void 0, void 0, function* () {
                const val = yield this.storage.getItem(command);
                if (val) {
                    Log_1.Log.info('Got offline data', command);
                    return JSON.parse(val);
                }
                else {
                    Log_1.Log.info('No offline data for ' + command);
                }
            });
        }
        /**
         * Cache the results after posting. Return cached results for the first call and refresh the cache.
         * @param command The command.
         * @param data The data.
         */
        cachedGet(command, data) {
            return __awaiter(this, void 0, void 0, function* () {
                Log_1.Log.info('Getting ', command, 'noCache');
                const res = yield this.get(command, data);
                Log_1.Log.info('Got result for ', command, !!res);
                if (res) {
                    Log_1.Log.info('Caching ', command);
                    yield this.storage.setItem(command, JSON.stringify(res));
                }
                return res;
            });
        }
        get(command, args, otpToken) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.fetchUrl(command, 'GET', args, undefined, otpToken);
            });
        }
        getString(command) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.fetchUrl(command, 'GET', {}, undefined, undefined, true);
            });
        }
        toFullAddress(command) {
            return this.host + command;
        }
        fetchUrl(command, method, args, data, otpToken, returnString = false) {
            return __awaiter(this, void 0, void 0, function* () {
                Log_1.Log.info('api.fetchUrl: Calling command: ', command);
                let fullCommand = args && Object.keys(args).length ?
                    command + '?' + Object.keys(args)
                        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(args[k]))
                        .join('&') :
                    command;
                const sessionHeader = this.context.getSession();
                const adminSessionHeader = this.context.getAdminSession();
                remoteLog(`calling api '${this.host + fullCommand}'`);
                let res;
                try {
                    const metricCommand = command.split('/')[0];
                    const metric = this.metric.start(metricCommand);
                    res = yield fetch(this.host + fullCommand, {
                        method: method,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Session': sessionHeader,
                            'Admin-Session': adminSessionHeader,
                            'otp-token': otpToken || '',
                        },
                        body: JSON.stringify(data),
                    });
                    metric.done();
                    this.pubSub.pub('analyticsEvent', { type: 'API_' + metricCommand, payload: {} });
                }
                catch (e) {
                    const errorText = ErrorUtils_1.ErrorUtils.fromError(e);
                    remoteLog({ calling: command, error: errorText });
                    Log_1.Log.error('Error calling server', e);
                    this.pubSub.pub('analyticsEvent', { type: 'API_ERROR_' + command, payload: {} });
                    throw new ErrorUtils_1.ApiError(0, 'FETCH_ERROR: error calling ' + command, errorText);
                }
                if (res.ok) {
                    const sessionResult = res.headers.get('Session');
                    if ((command.substr(0, 6) === 'signIn' || command === 'createUserWithEmailNameAndPw') &&
                        sessionResult) {
                        Log_1.Log.info('fetchUrl: setting the session');
                        this.context.setSession(sessionResult);
                    }
                    const adminSessionResult = res.headers.get('Admin-Session');
                    if (command === 'admin/signIn' && adminSessionResult) {
                        this.context.setAdminSession(adminSessionResult);
                    }
                    const text = yield res.text();
                    return text ? (returnString ? text : JSON.parse(text)) : {};
                }
                else {
                    remoteLog({ st: res.statusText, cd: res.status, xt: res.url });
                    const errorText = yield res.text();
                    Log_1.Log.error('Error calling server' + command + args + res.status + res.statusText + errorText);
                    this.pubSub.pub('analyticsEvent', { type: 'API_ERROR_' + command, payload: {} });
                    throw new ErrorUtils_1.ApiError(res.status, (res.status > 500 ? 'FETCH_ERROR:' : '') + res.statusText, errorText);
                }
            });
        }
    }
    exports.Api = Api;
    function remoteLog(message) {
        if (!AppEnv_1.AppEnv.isStandalone() && !AppEnv_1.AppEnv.isNative()) {
            ReduxUtils_1.ReduxUtils.getStore().dispatch(Actions_1.addAction(Actions_1.ActionTypes.LOG, message));
        }
        else {
            Log_1.Log.info('remoteLog: Local - ', message);
        }
    }
    exports.remoteLog = remoteLog;
});
//# sourceMappingURL=Api.js.map