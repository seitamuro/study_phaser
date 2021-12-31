import Target from "./Target.js"

export default class Targets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene)

        this.classType = Target

        this.targetConfig = [
            { color: 0xff0000, type: "score" },
            { color: 0x0000ff, type: "gameover"},
        ]
    }

    start() {
        this.timedEvent = this.scene.time.addEvent({
            delay: 300,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        })
    }

    stop() {
        this.timedEvent.remove()
    }

    spawn() {
        let configId = Phaser.Math.RND.between(0, this.targetConfig.length - 1)
        let config = this.targetConfig[configId]
        let {width, height} = this.scene.sys.canvas
        let x = Phaser.Math.RND.between(0, width)
        let y = -100
        let r = Phaser.Math.RND.between(50, 100)
        let target = new Target(this.scene, x, y, r, config.color)
        target.type = config.type
        this.add(target)
        target.create()
        target.on("clicked", target.hit)
    }
}