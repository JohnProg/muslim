import * as localStorage from "nativescript-localstorage";

export class LocalStorage {
    static set(key: string, value: string): boolean {
        localStorage.setItem(key, value);

        return this.get(key) ? true : false;
    }

    static get(key: string): string {
        return localStorage.getItem(key);
    }

    static setObject(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getObject(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    static remove(key: string): any {
        localStorage.removeItem(key);
    }

    static clear(): any {
        localStorage.clear();
    }
}
