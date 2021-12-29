import Target from "./Target.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    create() {
        this.target = new Target(this)
        this.physics.add.existing(this.target, false)
        this.target.body.setCollideWorldBounds(true)
        this.target.body.setBounce(1.0)
    }
}