import Tweens from "./Tweens.js"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Tweens]
}

var game = new Phaser.Game(config)