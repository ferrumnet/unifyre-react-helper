var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../Consts", "../../redux/ReduxUtils", "../Log"], function (require, exports, Consts_1, ReduxUtils_1, Log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function categoryFor(ev) {
        const name = ev.event || '';
        if (name.indexOf('API') >= 0) {
            return 'api';
        }
        if (name.indexOf('NAVI') >= 0) {
            return 'navi';
        }
        if (name.indexOf('API_ERROR') >= 0) {
            return 'error';
        }
        return 'un';
    }
    function eventBreakdown(ev) {
        const evName = (ev.event || '').split('.');
        return { event: evName[0], label: evName.length > 1 ? evName[1] : '' };
    }
    class GoogleMeasurementClient {
        constructor(context) {
            this.context = context;
        }
        __name__() { return 'GoogleMeasurementClient'; }
        collectTiming(events) {
            return __awaiter(this, void 0, void 0, function* () {
                const parts = events.map(mo => {
                    const { event, label } = eventBreakdown(mo);
                    return [
                        `t=timing`,
                        `utc=${categoryFor(mo)}`,
                        `utv=${event}`,
                        `utl=${label}`,
                        `utt=${mo.value}`
                    ];
                });
                yield Promise.all(parts.map(p => {
                    return this.api([p]);
                }));
            });
        }
        collectEvent(events) {
            return __awaiter(this, void 0, void 0, function* () {
                const parts = events.map(mo => {
                    const { event, label } = eventBreakdown(mo);
                    return [
                        `t=event`,
                        `ec=${categoryFor(mo)}`,
                        `ea=${event}`,
                        `el=${label}`,
                        `ev=${mo.value}`
                    ];
                });
                yield Promise.all(parts.map(p => {
                    return this.api([p]);
                }));
            });
        }
        collectPageVisits(pageVisits) {
            return __awaiter(this, void 0, void 0, function* () {
                const parts = pageVisits.map(pv => {
                    return [
                        `t=pageview`,
                        `dh=kudi-app`,
                        `dp=${pv.page}${pv.subPage ? '/' + pv.subPage : ''}`,
                    ];
                });
                yield Promise.all(parts.map(p => {
                    return this.api([p]);
                }));
            });
        }
        api(args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const ga = this.context.config(Consts_1.Consts.GA_TRACKING_ID);
                    const cid = ReduxUtils_1.ReduxUtils.getUserInfo().intId || '';
                    const lines = args.map(i => ['v=1', `tid=${ga}`, `cid=${cid}`].concat(i).join('&'));
                    const data = lines.join('\n');
                    yield this.post(encodeURI(data));
                }
                catch (e) {
                    Log_1.Log.error('Error saving remote measurement', e);
                }
            });
        }
        post(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetch(GoogleMeasurementClient.GA_URL, {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'text/plain' }
                });
            });
        }
    }
    GoogleMeasurementClient.GA_URL = 'https://www.google-analytics.com/collect';
    exports.GoogleMeasurementClient = GoogleMeasurementClient;
});
//# sourceMappingURL=GoogleMeasurementClient.js.map