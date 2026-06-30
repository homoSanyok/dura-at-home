import { Assets, Container, Rectangle, Sprite, Texture } from "pixi.js";
import { TILE_SIZE } from "@app/config";

export async function loadLayer(options: { csvPath: string, tilesetPath: string }) {
    const [csvText, baseTexture] = await Promise.all([
        Assets.load<string>(options.csvPath),
        Assets.load<Texture>(options.tilesetPath)
    ]);

    baseTexture.source.scaleMode = 'nearest';
    baseTexture.source.style.update();

    const tilesetCols = Math.floor(baseTexture.width / TILE_SIZE);
    const layerContainer = new Container();

    const rows = csvText.trim().split('\n').filter(row => row.trim().length > 0);

    for (let y = 0; y < rows.length; y++) {
        const cols = rows[y].split(',');

        for (let x = 0; x < cols.length; x++) {
            const tileId = parseInt(cols[x].trim(), 10);
            if (isNaN(tileId) || tileId === -1) continue;

            const tileIndex = tileId;
            const srcX = (tileIndex % tilesetCols) * TILE_SIZE;
            const srcY = Math.floor(tileIndex / tilesetCols) * TILE_SIZE;

            const tileTexture = new Texture({
                source: baseTexture.source,
                frame: new Rectangle(srcX, srcY, TILE_SIZE, TILE_SIZE)
            });

            tileTexture.source.scaleMode = 'nearest';
            tileTexture.source.style.update();

            const tileSprite = new Sprite(tileTexture);

            // В v8 используем Math.round вместо roundPixels
            tileSprite.x = Math.round(x * TILE_SIZE);
            tileSprite.y = Math.round(y * TILE_SIZE);

            layerContainer.addChild(tileSprite);
        }
    }

    return layerContainer;
}