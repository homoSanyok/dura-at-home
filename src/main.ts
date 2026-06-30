import { Application, extensions, ExtensionType } from "pixi.js";
import { keysListener, loadBackground } from "@app/lib";
import { KeysT } from "@app/model";
import { hall as loadHall } from "@entities/hall/ui";

extensions.add({
  extension: {
    name: 'loadTxt',
    type: ExtensionType.LoadParser
  },
  test(url: string) {
    // Проверяем, заканчивается ли адрес файла на .csv
    return url.endsWith('.csv');
  },
  async load(url: string) {
    // Просто скачиваем файл как текст
    const response = await fetch(url);
    return await response.text();
  }
});

(async () => {
  const keys: KeysT = {};
  keysListener(keys);

  const app = new Application();
  await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    antialias: true,
    roundPixels: true
  });
  document.body.appendChild(app.canvas);

  const background = await loadBackground({ width: window.innerWidth, height: window.innerHeight, file: "assets/hall/hall.background.png" });
  const hall = await loadHall(keys, app.ticker);

  app.stage.addChild(background);
  app.stage.addChild(hall);
})();
