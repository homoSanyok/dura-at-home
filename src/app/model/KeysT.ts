export type KeyName = 'w' | 'a' | 's' | 'd' | 'space' | 'shift' | 'control' | 'enter' | 'escape' | string;

interface KeyState {
    pushed?: boolean;
    timestamp?: number;
}

export type KeysT = Record<KeyName, KeyState>;