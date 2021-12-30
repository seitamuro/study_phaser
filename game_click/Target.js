export default class Target extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius, 0, 360, false, color)
        scene.children.add(this)
        this.create(scene)
    }

    hit() {
        console.log("hit!")
        this.destroy()
    }

    create(scene) {
        console.log("creating")
        this.setInteractive()
        scene.physics.add.existing(this, false)
        this.body.setCollideWorldBounds(true)
        this.body.setBounce(1.0)
        this.on("clicked", this.hit)

        scene.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked")
        })
    }
}