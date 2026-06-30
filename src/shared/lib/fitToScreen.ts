import { Container } from "pixi.js";

export function fitToScreen(container: Container) {
    const containerWidth = container.width;
    const containerHeight = container.height;

    const scaleX = window.innerWidth / containerWidth;
    const scaleY = window.innerHeight / containerHeight;
    const scale = Math.min(scaleX, scaleY);

    container.scale.set(scale);
    container.x = (window.innerWidth - containerWidth * scale) / 2;
    container.y = (window.innerHeight - containerHeight * scale) / 2;
}