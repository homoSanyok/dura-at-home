import { KeyName, KeysT } from "@app/model";

export function keysListener(keys: KeysT) {
    window.addEventListener("keydown", e => {
        const key = e.key as KeyName;
        keys[key] = {
            pushed: true,
            timestamp: Date.now()
        }
    });
    window.addEventListener("keyup", e => {
        if (keys[e.key as KeyName]) keys[e.key as KeyName].pushed = false;
    });
}