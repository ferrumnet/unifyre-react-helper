var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../AppEnv", "../Log", "./MetricModel", "../Consts", "../services/GlobalContainer"], function (require, exports, AppEnv_1, Log_1, MetricModel_1, Consts_1, GlobalContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MetricCatalogWrapper {
        constructor(catalogId, svc) {
            this.catalogId = catalogId;
            this.svc = svc;
            this.time = nano();
        }
        done() {
            this.svc.done(this.catalogId, this.time);
        }
    }
    exports.MetricCatalogWrapper = MetricCatalogWrapper;
    class MetricsServiceGlobal {
        constructor(measurementClient) {
            this.measurementClient = measurementClient;
            this.metrics = new Map();
            this.dirty = false;
            this.lastRemoteSave = (new Date()).getTime() - Consts_1.Consts.METRIC_REMOTE_SAVE_TIMEOUT + 3000; // Try to push metrics start
            this.storage = GlobalContainer_1.GlobalContainer.instance().get('StringStorage');
            const dis = this;
            setInterval(() => dis._save(), Consts_1.Consts.METRIC_LOCAL_SAVE_TIMEOUT);
            this._load().then(() => { });
        }
        __name__() { return 'MetricsServiceGlobal'; }
        _save() {
            return __awaiter(this, void 0, void 0, function* () {
                const currentTime = (new Date()).getTime();
                const remoteSavePeriod = currentTime - this.lastRemoteSave;
                if (remoteSavePeriod > Consts_1.Consts.METRIC_REMOTE_SAVE_TIMEOUT) {
                    return yield this._remoteSave();
                }
                if (this.dirty) {
                    this.dirty = false;
                    const pairs = [];
                    Array.from(this.metrics.keys()).forEach(m => pairs.push([m, this.metrics.get(m)]));
                    yield this._saveMetrics(pairs);
                }
            });
        }
        _saveMetrics(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.storage.setItem(Consts_1.Consts.METRIC_LOCAL_STORAGE_KEY, JSON.stringify(data));
            });
        }
        _load() {
            return __awaiter(this, void 0, void 0, function* () {
                const savedMetrics = yield this.storage.getItem(Consts_1.Consts.METRIC_LOCAL_STORAGE_KEY);
                if (savedMetrics) {
                    // Log.info('Loaded metrics ', savedMetrics, savedMetrics.length);
                    const toLoad = JSON.parse(savedMetrics);
                    this.metrics.clear();
                    toLoad.forEach(p => this.metrics.set(p[0], p[1]));
                }
            });
        }
        _remoteSave() {
            return __awaiter(this, void 0, void 0, function* () {
                // Reset the metrics
                const metrics = this.metrics;
                this.metrics = new Map();
                this.lastRemoteSave = (new Date()).getTime();
                // Aggregate metrics
                const metVals = Array.from(metrics.keys()).map(k => {
                    if (metrics.get(k).length === 0) {
                        return;
                    }
                    const kProxy = metrics.get(k)[0];
                    const m = metrics.get(k);
                    let value = 0;
                    switch (kProxy.unit) {
                        case 'count':
                            value = m.reduce((v1, v2) => v1 + v2.value, 0);
                            break;
                        case 'duration':
                            const p90 = m.sort((a, b) => a.value - b.value);
                            const p90Item = p90[Math.round((p90.length - 1) * 0.8)];
                            value = p90Item.value;
                            break;
                        case 'navigation':
                            return;
                    }
                    return {
                        value: value,
                        unit: kProxy.unit,
                        event: k,
                    };
                }).filter(v => v !== undefined);
                const navigations = (metrics.get('NAVIGATIONS') || []).map(v => v.value);
                yield this._saveMetrics([]);
                yield this.measurementClient.collectTiming(metVals.filter(mv => mv.unit === 'duration'));
                yield this.measurementClient.collectEvent(metVals.filter(mv => mv.unit === 'count'));
                yield this.measurementClient.collectPageVisits(navigations);
            });
        }
        start(catalogId) {
            if (!this.metrics.has(catalogId)) {
                this.metrics.set(catalogId, new Array());
            }
            return new MetricCatalogWrapper(catalogId, MetricsServiceGlobal._instance());
        }
        done(catalogId, startTime) {
            const diff = nano() - startTime;
            if (AppEnv_1.AppEnv._isDev) {
                Log_1.Log.info(`${catalogId}: ${diff} nanoseconds`);
            }
            if (diff > 0 && this.metrics.has(catalogId)) {
                this.metrics.get(catalogId).push(MetricModel_1.durationMetric(diff));
                this.dirty = true;
            }
        }
        timedAsync(catalogId, fun) {
            return __awaiter(this, void 0, void 0, function* () {
                const t = this.start(catalogId);
                try {
                    return yield fun();
                }
                finally {
                    t.done();
                }
            });
        }
        count(catalogId, count) {
            if (!this.metrics.has(catalogId)) {
                this.metrics.set(catalogId, new Array());
            }
            this.metrics.get(catalogId).push(MetricModel_1.countMetric(count));
            this.dirty = true;
        }
        navigate(visitDuration) {
            const catalogId = 'NAVIGATIONS';
            if (!this.metrics.has(catalogId)) {
                this.metrics.set(catalogId, new Array());
            }
            this.metrics.get(catalogId).push({
                time: (new Date()).getTime(),
                unit: 'navigation',
                value: visitDuration,
            });
            this.dirty = true;
        }
        // @deprecated
        static _instance() {
            if (!MetricsServiceGlobal.__instance) {
                MetricsServiceGlobal.__instance = GlobalContainer_1.GlobalContainer.instance().get(MetricsServiceGlobal);
            }
            return MetricsServiceGlobal.__instance;
        }
    }
    exports.MetricsServiceGlobal = MetricsServiceGlobal;
    class MetricsServiceModuleWrapper {
        constructor(module) {
            this.svc = MetricsServiceGlobal._instance();
            this.dotModule = module + '.';
        }
        start(catalogId) {
            return this.svc.start(this.dotModule + catalogId);
        }
        done(catalogId, startTime) {
            this.svc.done(this.dotModule + catalogId, startTime);
        }
        timedAsync(catalogId, fun) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.svc.timedAsync(this.dotModule + catalogId, fun);
            });
        }
    }
    exports.MetricsServiceModuleWrapper = MetricsServiceModuleWrapper;
    function nano() {
        // @ts-ignore
        return AppEnv_1.AppEnv.isNative() ? global.nativePerformanceNow() : window.performance.now();
    }
    class ModuleLazy {
    }
    ModuleLazy.map = new Map();
    function metricsforModule(module) {
        if (!ModuleLazy.map.has(module)) {
            ModuleLazy.map.set(module, new MetricsServiceModuleWrapper(module));
        }
        return ModuleLazy.map.get(module);
    }
    exports.metricsforModule = metricsforModule;
});
//# sourceMappingURL=MetricsService.js.map