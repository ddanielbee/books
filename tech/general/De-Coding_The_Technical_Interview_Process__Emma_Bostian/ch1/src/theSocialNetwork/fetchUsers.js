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
var _this = this;
var randomUserApiUrl = 'https://randomuser.me/api?results=10';
var isRandomUserName = function (obj) {
    return typeof obj === 'object' &&
        typeof obj.title === 'string' &&
        typeof obj.first === 'string' &&
        typeof obj.last === 'string';
};
var isRandomUserPicture = function (obj) {
    return typeof obj === 'object' &&
        typeof obj.large === 'string' &&
        typeof obj.medium === 'string' &&
        typeof obj.thumbnail === 'string';
};
var isRandomUser = function (obj) {
    return typeof obj === 'object' && isRandomUserName(obj.name) && isRandomUserPicture(obj.picture);
};
var isRandomUserResponse = function (obj) {
    return typeof obj === 'object' && Array.isArray(obj.results) && obj.results.every(isRandomUser);
};
var fetchUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    var fetchResult, resultData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(randomUserApiUrl)];
            case 1:
                fetchResult = _a.sent();
                if (!fetchResult.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, fetchResult.json()];
            case 2:
                resultData = _a.sent();
                if (isRandomUserResponse(resultData)) {
                    return [2 /*return*/, resultData.results];
                }
                else {
                    throw new Error("Could not decode Random User Api response: " + JSON.stringify(resultData));
                }
                return [3 /*break*/, 4];
            case 3: throw new Error("Random User Api request failed with status text " + fetchResult.statusText);
            case 4: return [2 /*return*/];
        }
    });
}); };
var mapUserToListItem = function (user) {
    var userListItem = document.createElement('li');
    var userPicture = document.createElement('img');
    var userName = document.createElement('h3');
    userPicture.setAttribute('src', user.picture.medium);
    userName.textContent = user.name.title + " " + user.name.first + " " + user.name.last;
    userListItem.appendChild(userPicture);
    userListItem.appendChild(userName);
    return userListItem;
};
var requestAndInjectUsers = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var container, randomUsers, domUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('went in here');
                container = document.getElementById(id);
                console.log('container', container);
                if (!container) return [3 /*break*/, 2];
                console.log('container exists');
                return [4 /*yield*/, fetchUsers()];
            case 1:
                randomUsers = _a.sent();
                console.log(randomUsers);
                domUsers = randomUsers.map(mapUserToListItem);
                container.append.apply(container, domUsers);
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
requestAndInjectUsers('user-list');
