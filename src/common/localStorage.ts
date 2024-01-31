export default class LocalStorage {
  static setItem(key: string, data: string[] | boolean) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getItem(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
