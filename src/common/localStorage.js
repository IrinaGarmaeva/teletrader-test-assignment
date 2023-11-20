export class LocalStorage {
  static saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
