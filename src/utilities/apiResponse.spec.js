(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../tests/unit/apiMock", "./apiResponse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var apiMock_1 = require("../tests/unit/apiMock");
    var apiResponse_1 = require("./apiResponse");
    describe('utilities/ApiResponse', function () {
        var response = apiMock_1.mockResponse();
        beforeEach(function () {
            response = apiMock_1.mockResponse();
        });
        test('Api result with body', function () {
            apiResponse_1.default.result(response, {});
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                data: {},
                success: true,
            });
        });
        test('Api result with cookie', function () {
            apiResponse_1.default.result(response, {}, 200, {
                key: 'Auth',
                value: 'test123',
            });
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                data: {},
                success: true,
            });
            expect(response.cookie).toHaveBeenCalledWith('Auth', 'test123');
        });
        test('Api error with body', function () {
            apiResponse_1.default.error(response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                error: {
                    message: 'Bad Request',
                },
                override: null,
                success: false,
            });
        });
        test('Api Set Cookie', function () {
            apiResponse_1.default.setCookie(response, 'test', 'value');
            expect(response.cookie).toHaveBeenCalledWith('test', 'value');
        });
    });
});
//# sourceMappingURL=apiResponse.spec.js.map