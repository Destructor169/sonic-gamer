import k from "../kaplayCtx.js";

export default function gameover(citySfx) {
    if (citySfx) citySfx.paused = true;
    
    let bestScore = k.getData("best-score") || 0;
    const currentScore = k.getData("current-score") || 0;
    
    if (currentScore > bestScore) {
        bestScore = currentScore;
        k.setData("best-score", bestScore);
    }
    
    const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
    const rankValues = [0, 50, 100, 250, 500, 750, 1000];
    
    let currentRank = "F";
    let bestRank = "F";
    
    for (let i = 0; i < rankValues.length - 1; i++) {
        if (currentScore >= rankValues[i]) {
            currentRank = rankGrades[i];
        }
        if (bestScore >= rankValues[i]) {
            bestRank = rankGrades[i];
        }
    }
    
    k.add([
        k.text("GAME OVER", {font: "mania", size: 96}),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);
    
    k.add([
        k.text(`BEST SCORE: ${bestScore}`, {font: "mania", size: 64}),
        k.pos(k.center().x - 300, 300),
        k.anchor("center"),
    ]);
    
    k.add([
        k.text(`CURRENT SCORE: ${currentScore}`, {font: "mania", size: 64}),
        k.pos(k.center().x + 300, 300),
        k.anchor("center"),
    ]);
    
    const bestRankBox = k.add([
        k.rect(350, 350),
        k.color(0, 0, 0),
        k.outline(4, k.rgb(255, 255, 255)),
        k.pos(k.center().x - 400, 600),
        k.anchor("center"),
    ]);
    
    bestRankBox.add([
        k.text(bestRank, {font: "mania", size: 120}),
        k.anchor("center"),
        k.color(bestRank === "S" ? k.rgb(255, 215, 0) : k.rgb(255, 255, 255)),
    ]);
    
    const currentRankBox = k.add([
        k.rect(350, 350),
        k.color(0, 0, 0),
        k.outline(4, k.rgb(255, 255, 255)),
        k.pos(k.center().x + 400, 600),
        k.anchor("center"),
    ]);
    
    currentRankBox.add([
        k.text(currentRank, {font: "mania", size: 120}),
        k.anchor("center"),
        k.color(currentRank === "S" ? k.rgb(255, 215, 0) : k.rgb(255, 255, 255)),
    ]);
    
    k.add([
        k.text("PRESS SPACE TO RESTART", {font: "mania", size: 32}),
        k.pos(k.center().x, 800),
        k.anchor("center"),
    ]);
    
    k.onButtonPress("jump", () => k.go("main-menu"));
}