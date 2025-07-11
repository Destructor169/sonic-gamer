import k from "../kaplayCtx";
import { makesonic } from "../entities/sonic";

export default function mainMenu() {
    if(!k.getData("best-score")) k.setData("best-score", 0);
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8),]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth, 0), 
            k.scale(2), 
            k.opacity(0.8),
        ]),
    ];

    const platformWidth = 1280;

    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth*4, 450), k.scale(4),
        ])
    ];

    k.add([
        k.text("SONIC RING RUN", {font: "mania", size: 100}), 
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ])

    k.add([
        k.text("PRESS SPACE/CLICK/TOUCH TO PLAY", {font: "mania", size: 32}), 
        k.pos(k.center().x, k.center().y -  200),
        k.anchor("center"),
    ])

    const sonic = makesonic(k.vec2(200, 745));
    sonic.play("run");

    k.onUpdate(() => {
        if(bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth*2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0)
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth*2, 0);

        if(platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width*4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-4000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width*4, 450);
    })
}