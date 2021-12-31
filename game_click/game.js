import Target from "./Target.js"
import Targets from "./Targets.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
        this.score = 0
    }

    create() {
        this.targets = new Targets(this.physics.world, this).setDepth(0)
        this.targets.start()

        this.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked")
            if (gameObject.type == "score") {
                this.score += 1
                this.scoreText.setText("score: " + this.score)
            } else {
                var {width, height} = this.sys.canvas
                this.gameoverText = this.add.text(width / 2, height / 2, "Game Over", {fontSize: "64px", fill: "#ffffff"}).setDepth(10).setOrigin(0.5, 0.5)
                this.targets.stop()
                this.input.off("gameobjectup")
            }
        })

        this.scoreText  = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#ffffff"}).setDepth(10)
    }
}