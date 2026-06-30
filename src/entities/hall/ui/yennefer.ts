import { loadCharacter } from "@app/lib";
import { KeyName, KeysT } from "@app/model";
import { AnimatedSprite, Polygon, Ticker } from "pixi.js";

const FRAME_DURATION = 10;
const MOVE_ALPHA = 2.2;
const POLYGON_MAP = new Polygon([
    2 * 32, 5 * 32,   // 64, 160
    2 * 32, 8 * 32,   // 64, 256
    0, 8 * 32,   // 0, 256
    0, 14 * 32,  // 0, 448
    3 * 32, 14 * 32,  // 96, 448
    3 * 32, 13 * 32,  // 96, 416
    7 * 32, 13 * 32,  // 224, 416
    7 * 32, 15 * 32,  // 224, 480
    12 * 32, 15 * 32, // 384, 480
    13 * 32, 15 * 32, // 384, 448
    13 * 32, 14 * 32, // 416, 448
    13 * 32, 9 * 32,  // 416, 288
    8 * 32, 9 * 32,   // 256, 288
    8 * 32, 5 * 32    // 256, 160
]);

const RIGHT_FRAMES = [0, 1, 2, 3];
const LEFT_FRAMES = [4, 5, 6, 7];
const DOWN_FRAMES = [8, 9, 10, 11];
const UP_FRAMES = [12, 13, 14, 15];

let frameTimer = 0;

export function yennefer(keys: KeysT, ticker: Ticker): Promise<AnimatedSprite> {
    return new Promise(async (resolve) => {
        const yennefer = await loadCharacter([
            { frameWidth: 80, frameHeight: 64, cols: 4, rows: 2, file: "assets/yennefer/walk-horizontal.png" },
            { frameWidth: 40, frameHeight: 64, cols: 4, rows: 2, file: "assets/yennefer/walk-vertical.png" },
        ]);
        resolve(yennefer);

        yennefer.gotoAndStop(5);
        yennefer.x = 9 * 32;
        yennefer.y = 12 * 32;

        ticker.add(ticker => {
            frameTimer += ticker.deltaTime;

            if (!yennefer) return;

            let lastPushedKey: KeyName | undefined = "w";
            for (const key of (["w", "a", "s", "d"] as KeyName[])) {
                if (keys[key]?.pushed && (keys[key]?.timestamp > keys[lastPushedKey]?.timestamp)) {
                    lastPushedKey = key;
                }
            }
            if (!keys[lastPushedKey]?.pushed) return;

            switch (lastPushedKey) {
                case "w": {
                    const xCompensation = RIGHT_FRAMES.includes(yennefer.currentFrame) ? 40 : 0;
                    if (!isInPoligin({
                        yennefer: yennefer,
                        x: yennefer.x + xCompensation,
                        y: yennefer.y - ticker.deltaTime * MOVE_ALPHA,
                        width: 40,
                        height: 64
                    })) {
                        if (UP_FRAMES.includes(yennefer.currentFrame)) return;
                        gotoUp(yennefer);
                        return;
                    }

                    yennefer.x += xCompensation;
                    yennefer.y -= ticker.deltaTime * MOVE_ALPHA;
                    gotoUp(yennefer);
                    break;
                }
                case "s": {
                    if (!isInPoligin({
                        yennefer: yennefer,
                        x: yennefer.x,
                        y: yennefer.y + ticker.deltaTime * MOVE_ALPHA,
                        width: 40,
                        height: 64
                    })) {
                        if (DOWN_FRAMES.includes(yennefer.currentFrame)) return;
                        gotoDown(yennefer)
                        return;
                    }

                    yennefer.y += ticker.deltaTime * MOVE_ALPHA;
                    gotoDown(yennefer);
                    break;
                }
                case "a": {
                    if (!isInPoligin({
                        yennefer: yennefer,
                        x: yennefer.x - ticker.deltaTime * MOVE_ALPHA,
                        y: yennefer.y,
                        width: 80,
                        height: 64
                    })) {
                        if (LEFT_FRAMES.includes(yennefer.currentFrame) || RIGHT_FRAMES.includes(yennefer.currentFrame)) return;
                        if (!isInPoligin({
                            yennefer: yennefer,
                            x: yennefer.x - ticker.deltaTime * MOVE_ALPHA - 40,
                            y: yennefer.y,
                            width: 80,
                            height: 64
                        })) {
                            gotoLeft(yennefer);
                            return;
                        }

                        yennefer.x -= 40;
                    }

                    yennefer.x -= ticker.deltaTime * MOVE_ALPHA;
                    gotoLeft(yennefer);
                    break;
                }
                case "d": {
                    if (!isInPoligin({
                        yennefer: yennefer,
                        x: yennefer.x + ticker.deltaTime * MOVE_ALPHA,
                        y: yennefer.y,
                        width: 80,
                        height: 64
                    })) {
                        if (LEFT_FRAMES.includes(yennefer.currentFrame) || RIGHT_FRAMES.includes(yennefer.currentFrame)) return;
                        if (!isInPoligin({
                            yennefer: yennefer,
                            x: yennefer.x + ticker.deltaTime * MOVE_ALPHA - 40,
                            y: yennefer.y,
                            width: 80,
                            height: 64
                        })) {
                            gotoRight(yennefer);
                            return;
                        }

                        yennefer.x -= 40;
                    }

                    yennefer.x += ticker.deltaTime * MOVE_ALPHA;
                    gotoRight(yennefer);
                    break;
                }
            }

            gotoStop(yennefer);
        })
    });
}

function isInPoligin(options: {
    yennefer: AnimatedSprite,
    x: number,
    y: number,
    width: number,
    height: number
}) {
    return POLYGON_MAP.contains(options.x, options.y) &&
        POLYGON_MAP.contains(options.x + options.width, options.y) &&
        POLYGON_MAP.contains(options.x + options.width, options.y + options.height) &&
        POLYGON_MAP.contains(options.x, options.y + options.height)
}

function gotoRight(yennefer: AnimatedSprite) {
    if (frameTimer > FRAME_DURATION || yennefer.currentFrame > 3) {
        yennefer.gotoAndStop((yennefer.currentFrame + 1) % 4);
        frameTimer = 0;
    }
}

function gotoLeft(yennefer: AnimatedSprite) {
    if (frameTimer > FRAME_DURATION || (yennefer.currentFrame < 4 || yennefer.currentFrame > 7)) {
        yennefer.gotoAndStop(4 + (yennefer.currentFrame + 1) % 4);
        frameTimer = 0;
    }
}

function gotoDown(yennefer: AnimatedSprite) {
    if (frameTimer > FRAME_DURATION || (yennefer.currentFrame < 8 || yennefer.currentFrame > 11)) {
        yennefer.gotoAndStop(8 + (yennefer.currentFrame + 1) % 4);
        frameTimer = 0;
    }
}

function gotoUp(yennefer: AnimatedSprite) {
    if (frameTimer > FRAME_DURATION || yennefer.currentFrame < 12) {
        yennefer.gotoAndStop(12 + (yennefer.currentFrame + 1) % 4);
        frameTimer = 0;
    }
}

function gotoStop(yennefer: AnimatedSprite) {
    if (frameTimer > FRAME_DURATION) {
        frameTimer = 0;

        if (yennefer.currentFrame <= 3) yennefer.gotoAndStop(RIGHT_FRAMES[0]);
        else if (yennefer.currentFrame >= 4 && yennefer.currentFrame <= 7) yennefer.gotoAndStop(LEFT_FRAMES[3]);
        else if (yennefer.currentFrame >= 8 && yennefer.currentFrame <= 11) yennefer.gotoAndStop(DOWN_FRAMES[0]);
        if (yennefer.currentFrame >= 12) yennefer.gotoAndStop(UP_FRAMES[0]);
    }
}