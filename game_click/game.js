import Target from "./Target.js"
import Targets from "./Targets.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    create() {
        this.targets = new Targets(this.physics.world, this)
        this.targets.start()
    }
}