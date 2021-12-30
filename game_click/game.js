import Target from "./Target.js"
import Targets from "./Targets.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
        this.score = 0
    }

    create() {
        this.targets = new Targets(this.physics.world, this)
        this.targets.start()

        this.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked")
            this.score += 1
            this.scoreText.setText("score: " + this.score)
        })

        this.scoreText  = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#ffffff"})
    }
}