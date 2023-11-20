"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateYamlCoverage = void 0;
var yaml = require("js-yaml");
var fs = require("fs");
// calculateYamlCoverage('./testCoverage.yml');
function calculateYamlCoverage(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var obj, pages;
        return __generator(this, function (_a) {
            console.log(filePath);
            obj = yaml.load(fs.readFileSync(filePath, { encoding: 'utf-8' }));
            pages = JSON.parse(JSON.stringify(obj, null, 2));
            calculateCoverage(pages);
            return [2 /*return*/];
        });
    });
}
exports.calculateYamlCoverage = calculateYamlCoverage;
var totalProductFeatures = 0;
var coveredProductFeatures = 0;
var totalPageFeatures = 0;
var coveredPageFeatures = 0;
function calculateCoverage(pages) {
    var output = '';
    pages.forEach(function (page) {
        iterateThroughFeature(page.features);
        var pageCoverage = "".concat(page.page, " page has ").concat(Math.round((coveredPageFeatures / totalPageFeatures) * 100 * 100) / 100, "% coverage");
        output += pageCoverage + '\n';
        console.log(pageCoverage);
        // resetting count for the current page
        totalPageFeatures = 0;
        coveredPageFeatures = 0;
    });
    var totalCoverage = "\nTotal Product coverage is: ".concat(Math.round((coveredProductFeatures / totalProductFeatures) * 100 * 100) /
        100, "%\n");
    output += totalCoverage;
    console.log(totalCoverage);
    fs.writeFileSync('coverage-output.txt', output);
}
function iterateThroughFeature(feature) {
    Object.entries(feature).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (typeof value === 'object') {
            iterateThroughFeature(feature[key]);
        }
        else {
            addCount(value);
        }
    });
}
// since value will be either true of false based on that we add to features or coverage
function addCount(value) {
    if (value) {
        totalPageFeatures++;
        coveredPageFeatures++;
        totalProductFeatures++;
        coveredProductFeatures++;
    }
    else {
        totalPageFeatures++;
        totalProductFeatures++;
    }
}