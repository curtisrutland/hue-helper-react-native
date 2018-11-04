import { AsyncStorage } from "react-native";

const keys: { [key: string]: number } = {};

export async function get<T>(url: string) {
    const response = await fetch(url);
    return await response.json() as T
}

export async function put<T>(url: string, data: any) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: "PUT",
        mode: "cors"
    });
    return await response.json() as T;
}

export async function post<T>(url: string, data: any) {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        mode: "cors"
    });
    return await response.json() as T;
}

export function delay(ms: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms));
}

const usernameKey = "HUE_API_USERNAME";
const getKey = (bridgeId: string) => `${usernameKey}#${bridgeId}`

export function getStoredUsername(bridgeId: string) {
    const key = getKey(bridgeId);
    keys[key] = 1;
    return AsyncStorage.getItem(getKey(bridgeId));
}

export function storeUsername(bridgeId: string, username: string) {
    return AsyncStorage.setItem(getKey(bridgeId), username);
}

export async function clearLocalStorage() {
    await AsyncStorage.multiRemove(Object.keys(keys));
    console.log("all storage cleared");
}