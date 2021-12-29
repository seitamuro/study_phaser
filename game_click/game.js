export default class Game extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    preload() {
        this.target = this.add.circle(100, 100, 100, 0xff0000)
    }


    create() {
        this.target.hit = () => {
            console.log("click!")
            this.target.destroy()
        }
        this.target.setInteractive()
        this.physics.add.existing(this.target, false)
        this.target.body.setCollideWorldBounds(true)
        this.target.body.setBounce(1.0)
        this.target.on("clicked", this.target.hit, this.target)

        this.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked", gameObject)
        })
    }
}