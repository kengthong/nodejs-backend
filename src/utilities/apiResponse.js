(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "http-status-codes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var http_status_codes_1 = require("http-status-codes");
    var ApiResponse = (function () {
        function ApiResponse() {
        }
        ApiResponse.result = function (res, data, status, cookie) {
            if (status === void 0) { status = 200; }
            if (cookie === void 0) { cookie = null; }
            res.status(status);
            if (cookie) {
                res.cookie(cookie.key, cookie.value);
            }
            res.json({
                data: data,
                success: true,
            });
        };
        ApiResponse.error = function (res, status, error, override) {
            if (status === void 0) { status = 400; }
            if (error === void 0) { error = http_status_codes_1.default.getStatusText(status); }
            if (override === void 0) { override = null; }
            res.status(status).json({
                override: override,
                error: {
                    message: error,
                },
                success: false,
            });
        };
        ApiResponse.setCookie = function (res, key, value) {
            res.cookie(key, value);
        };
        return ApiResponse;
    }());
    exports.default = ApiResponse;
});
//# sourceMappingURL=apiResponse.js.map