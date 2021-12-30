import Target from "./Target.js"

export default class Targets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene)

        this.classType = Target
    }

    start() 
    {
        let target1 = new Target(this.scene, 100, 100, 50, 0xff0000)
        let target2 = new Target(this.scene, 200, 100, 50, 0x00ff00)
        let target3 = new Target(this.scene, 300, 100, 50, 0x0000ff)

        //this.add(target1, true)
        //this.add(target2, true)
        //this.add(target3, true)
    }
}