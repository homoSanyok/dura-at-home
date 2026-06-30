import { Container, Ticker } from "pixi.js";
import { fitToScreen } from "@shared/lib";
import { yennefer as loadYennefer } from "./yennefer";
import { loadLayer } from "@app/lib";
import { KeysT } from "@app/model";

const HALL_PATH_PREFIX = "assets/hall";
const TILESET_PATH = HALL_PATH_PREFIX + "/hall.tileset.png";

export async function hall(keys: KeysT, ticker: Ticker) {
    const container = new Container();

    const [
        floor,
        carpet,
        walls,
        entranceKitchen,
        entranceHallBath,
        bar,
        barStuff,
        wallStuff,
        cabinet,
        cleaningStuff,
        lex,
        chorni,
        top,
        compod,
        bathroomDoorjamb,
        yennefer
    ] = await Promise.all([
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_пол.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_коврик.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_стены.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_вход кухня.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_входы зал ванна.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_бар.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_херь на баре.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_херь на стену.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_шкаф.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_уборочная херь.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_лекс.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_чорни.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_верхушка.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_комрод.csv`, tilesetPath: TILESET_PATH }),
        loadLayer({ csvPath: `${HALL_PATH_PREFIX}/hall_косяк_у_ванной.csv`, tilesetPath: TILESET_PATH }),
        loadYennefer(keys, ticker)
    ]);

    container.addChild(floor);           // пол (самый нижний)
    container.addChild(carpet);          // коврик
    container.addChild(walls);           // стены
    container.addChild(entranceHallBath);// входы зал ванна
    container.addChild(entranceKitchen); // вход кухня
    container.addChild(bathroomDoorjamb);// косяк у ванной
    container.addChild(bar);             // бар
    container.addChild(lex);             // лекс
    container.addChild(yennefer);        // собака
    container.addChild(cleaningStuff);   // уборочная херь
    container.addChild(compod);          // комрод
    container.addChild(barStuff);        // херь на баре
    container.addChild(cabinet);         // шкаф
    container.addChild(wallStuff);       // херь на стену
    container.addChild(chorni);          // чорни
    container.addChild(top);             // верхушка (самый верхний)

    fitToScreen(container);

    return container;
}