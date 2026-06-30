import { AnimatedSprite, Assets, Rectangle, Texture } from "pixi.js";

export async function loadCharacter(options: {
    frameWidth: number,
    frameHeight: number,
    cols: number,
    rows: number,
    file: string
}[]) {
    const textures: Texture[] = [];

    for (const option of options) {
        // 1. Загружаем общую картинку через менеджер ассетов PixiJS
        const baseTexture = await Assets.load<Texture>(option.file);
        baseTexture.source.scaleMode = "nearest";
        baseTexture.source.update();

        // 2. Проходим циклом по строкам и колонкам сетки
        for (let r = 0; r < option.rows; r++) {
            for (let c = 0; c < option.cols; c++) {

                // Вычисляем координаты X и Y для текущего кадра
                const x = c * option.frameWidth;
                const y = r * option.frameHeight;

                // Создаем прямоугольник области кадра
                const rect = new Rectangle(x, y, option.frameWidth, option.frameHeight);

                // Вырезаем текстуру из базового источника (синтаксис PixiJS v8)
                const frameTexture = new Texture({
                    source: baseTexture.source,
                    frame: rect
                });

                textures.push(frameTexture);
            }
        }
    }

    // Возвращаем массив готовых фреймов
    const sprite = new AnimatedSprite(textures);
    sprite.roundPixels = true;

    return sprite;
}