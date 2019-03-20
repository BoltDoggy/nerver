"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var process_1 = require("process");
var dotenv_1 = __importDefault(require("dotenv"));
var koa_1 = __importDefault(require("koa"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_better_body_1 = __importDefault(require("koa-better-body"));
var koa_static_1 = __importDefault(require("koa-static"));
var package_json_1 = require("../package.json");
var util_1 = require("./util");
var CWD = process_1.cwd();
dotenv_1["default"].config({ path: path_1["default"].resolve(CWD, '.env') });
var app = new koa_1["default"]();
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(ctx.method, ctx.path);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!(path_1["default"].extname(ctx.path) !== '.ts')) return [3 /*break*/, 3];
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * 允许跨域
 */
app.use(cors_1["default"]());
/**
 * 静态资源
 */
app.use(koa_static_1["default"](CWD));
/**
 * 解析 post body
 */
app.use(koa_better_body_1["default"]());
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var truePath, ret;
    var _this = this;
    return __generator(this, function (_a) {
        truePath = path_1["default"].join(CWD, ".nerver.config.ts");
        ret = fs_1["default"].existsSync(truePath);
        if (ret) {
            return [2 /*return*/, util_1.reImport(truePath)
                    .then(function (mod) { return util_1.isFun(mod) && mod.bind(_this)(ctx); })["catch"](function (err) {
                    next();
                    return Promise.reject(err);
                })
                    .then(function () { return next(); })];
        }
        else {
            return [2 /*return*/, next()];
        }
        return [2 /*return*/];
    });
}); });
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var truePath;
    var _this = this;
    return __generator(this, function (_a) {
        truePath = path_1["default"].join(CWD, ctx.path + ".ts");
        return [2 /*return*/, util_1.reImport(truePath)
                .then(function (mod) { return util_1.isFun(mod) && mod.bind(_this)(ctx); })
                .then(function (req) {
                // 用于支持 return
                if (!ctx.body) {
                    ctx.body = req;
                }
            })];
    });
}); });
app.listen(process_1.env.port || 3000);
console.log("Nerver Version: " + package_json_1.version);
console.log("Nerver on http://127.0.0.1:" + (process_1.env.port || 3000));
