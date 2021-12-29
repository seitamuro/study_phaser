import Game from "./game.js"

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x555555,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Game]
}

var game = new Phaser.Game(config)