define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function countMetric(value) {
        return {
            time: (new Date()).getTime(),
            unit: 'count',
            value: value,
        };
    }
    exports.countMetric = countMetric;
    function durationMetric(value) {
        return {
            time: (new Date()).getTime(),
            unit: 'duration',
            value: value,
        };
    }
    exports.durationMetric = durationMetric;
});
//# sourceMappingURL=MetricModel.js.map