import Scene1 from "./Scene1.js"
import Scene2 from "./Scene2.js"
import Scene3 from "./Scene3.js"

var config = {
    type: Phaser.AUTO,
    backgroundColor: "#888888",
    width: 800,
    height: 600,
    scene: [Scene1, Scene2, Scene3]
}

var game = new Phaser.Game(config)