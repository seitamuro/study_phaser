export default class Target extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius, 0, 360, false, color)
        scene.physics.add.existing(this, false)
        scene.children.add(this)
    }

    hit() {
        console.log("hit!")
        this.destroy()
    }

    create() {
        this.setInteractive()
        this.body.setCollideWorldBounds(true)
        this.body.setBounce(1.0)
        /*
        this.on("clicked", this.hit)

        scene.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked")
        })
        */
    }
}