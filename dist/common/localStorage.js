var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.saveToLocalStorage = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };
    LocalStorage.getFromLocalStorage = function (key) {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };
    LocalStorage.removeFromLocalStorage = function (key) {
        localStorage.removeItem(key);
    };
    LocalStorage.clear = function () {
        localStorage.clear();
    };
    return LocalStorage;
}());
export { LocalStorage };
