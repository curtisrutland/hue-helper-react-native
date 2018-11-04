import { Toast } from "native-base";

export function toast(text: string) {
    Toast.show({ text });
}