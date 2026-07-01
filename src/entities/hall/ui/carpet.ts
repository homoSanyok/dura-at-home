import { loadLayer } from "@app/lib";
import { KeysT } from "@app/model";
import { AnimatedSprite, Container, ContainerChild, Ticker } from "pixi.js";

export async function carpet(yennefer: AnimatedSprite, keys: KeysT, appTicker: Ticker): Promise<Container<ContainerChild>> {
    return new Promise(async (resolve) => {
        const carpet = await loadLayer({ csvPath: "assets/hall/hall_коврик.csv", tilesetPath: "assets/hall/hall.tileset.png" });
        resolve(carpet);

        let carpetCrossed = false;
        appTicker.add(() => {
            // console.log(yennefer.x, yennefer.y, carpet.x, carpet.y);
            if (rectsIntersectOrContain(yennefer, carpet) && !carpetCrossed) {
                shakeContainer(carpet, .5, 250, appTicker);
                carpetCrossed = true;
            }

            if (!rectsIntersectOrContain(yennefer, carpet) && carpetCrossed) {
                carpetCrossed = false;
            }

            if (keys.e?.pushed) { }
        });
    });
}

function rectsIntersectOrContain(
    rect1: { x: number, y: number, width: number, height: number },
    rect2: { x: number, y: number, width: number, height: number }
): boolean {
    // Проверяем, есть ли общие точки (включая касание)
    const hasIntersection = !(rect1.x + rect1.width < rect2.x ||
        rect2.x + rect2.width < rect1.x ||
        rect1.y + rect1.height < rect2.y ||
        rect2.y + rect2.height < rect1.y);

    // Проверяем, лежит ли rect1 внутри rect2
    const rect1InsideRect2 = rect1.x >= rect2.x &&
        rect1.y >= rect2.y &&
        rect1.x + rect1.width <= rect2.x + rect2.width &&
        rect1.y + rect1.height <= rect2.y + rect2.height;

    // Проверяем, лежит ли rect2 внутри rect1
    const rect2InsideRect1 = rect2.x >= rect1.x &&
        rect2.y >= rect1.y &&
        rect2.x + rect2.width <= rect1.x + rect1.width &&
        rect2.y + rect2.height <= rect1.y + rect1.height;

    return hasIntersection || rect1InsideRect2 || rect2InsideRect1;
}

function shakeContainer(
    container: Container,
    intensity: number = 5,
    duration: number = 500,
    appTicker: Ticker,
    onComplete?: () => void
): void {
    const startX = container.x;
    const startY = container.y;
    let elapsed = 0;

    const handler = (ticker: Ticker) => {
        elapsed += ticker.deltaTime * 16;

        if (elapsed >= duration) {
            container.x = startX;
            container.y = startY;
            appTicker.remove(handler);
            if (onComplete) onComplete();
            return;
        }

        const progress = elapsed / duration;
        const decay = 1 - progress;
        const currentIntensity = intensity * decay;
        const time = elapsed / 50;

        container.x = startX + Math.sin(time * 17.3) * currentIntensity;
        container.y = startY + Math.cos(time * 13.7) * currentIntensity;
    };

    appTicker.add(handler);
}