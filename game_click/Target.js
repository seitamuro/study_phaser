export default class Target extends Phaser.GameObjects.Arc {
    constructor(scene) {
        super(scene, 100, 100, 100, 0, 360, false, 0xff0000, 0.0)
        this.create(scene)
    }

    hit() {
        console.log("hit!")
        this.destroy()
    }

    create(scene) {
        this.setInteractive()
        this.on("clicked", this.hit)

        scene.input.on("gameobjectup", (pointer, gameObject) => {
            gameObject.emit("clicked")
        })
    }
}