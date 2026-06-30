import { Assets, Sprite } from "pixi.js";

export async function loadBackground(options: { width: number, height: number, file: string }) {
    const texture = await Assets.load(options.file);
    const sprite = new Sprite(texture);

    sprite.width = options.width;
    sprite.height = options.height;

    return sprite;
}