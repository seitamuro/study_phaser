import Target from "./Target.js"

export default class Targets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene)

        this.classType = Target

    }

    start() {
        this.timedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        })
    }

    stop() {
        this.timedEvent.remove()
    }

    spawn() {
        let {width, height} = this.scene.sys.canvas
        let x = Phaser.Math.RND.between(0, width)
        let y = Phaser.Math.RND.between(0, height/2)
        let r = Phaser.Math.RND.between(50, 100)
        let target = new Target(this.scene, x, y, r, 0xff0000)
        this.add(target)
        target.create()
        target.on("clicked", target.hit)
    }
}