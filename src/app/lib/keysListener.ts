import { KeysT } from "@app/model";

// Маппинг кодов клавиш на английские названия
const keyCodeMap: Record<string, string> = {
    'KeyW': 'w',
    'KeyA': 'a',
    'KeyS': 's',
    'KeyD': 'd',
    'Space': 'space',
    'ShiftLeft': 'shift',
    'ShiftRight': 'shift',
    'ControlLeft': 'control',
    'ControlRight': 'control',
    'Enter': 'enter',
    'Escape': 'escape',
    'ArrowUp': 'arrowup',
    'ArrowDown': 'arrowdown',
    'ArrowLeft': 'arrowleft',
    'ArrowRight': 'arrowright',
    'KeyE': 'e',
    'KeyR': 'r',
    'KeyF': 'f',
    'KeyQ': 'q',
    'KeyZ': 'z',
    'KeyX': 'x',
    'KeyC': 'c',
    'KeyV': 'v',
    'KeyB': 'b',
    'KeyN': 'n',
    'KeyM': 'm',
    'Key1': '1',
    'Key2': '2',
    'Key3': '3',
    'Key4': '4',
    'Key5': '5',
    'Key6': '6',
    'Key7': '7',
    'Key8': '8',
    'Key9': '9',
    'Key0': '0',
};

export function keysListener(keys: KeysT): () => void {
    const onKeyDown = (e: KeyboardEvent) => {
        const keyName = keyCodeMap[e.code];
        if (!keyName) {
            console.warn(`Неизвестный код клавиши: ${e.code}`);
            return;
        }

        // Предотвращаем повторные нажатия (если клавиша уже зажата)
        if (keys[keyName]?.pushed) return;

        keys[keyName] = {
            pushed: true,
            timestamp: Date.now()
        };
    };

    const onKeyUp = (e: KeyboardEvent) => {
        const keyName = keyCodeMap[e.code];
        if (!keyName) return;

        if (keys[keyName]) {
            keys[keyName].pushed = false;
        }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Возвращаем функцию для отписки
    return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
    };
}