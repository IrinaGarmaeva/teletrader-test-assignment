export default class LocalStorage {
  static saveToLocalStorage(key: string, data: string[] | boolean) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
