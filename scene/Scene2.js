export default class Scene2 extends Phaser.Scene {
    constructor () {
        super("Scene2")

        this.objects = {}
        this.prev_pressed = true
    }

    preload () {
        this.load.image("background", "assets/background.png")
    }

    create () {
        var {width, height} = this.sys.canvas
        this.objects.background = this.add.rectangle(0, 0, width, height, 0x00ff00).setOrigin(0, 0)
        this.objects.text = this.add.text(width / 2, height / 2, "Scene2", {fontsize: "32px", fill: "#fff"})
    }

    update() {
        if(this.input.activePointer.isDown) {
            if (!this.prev_pressed){
                console.log("mouse down")
                this.scene.start("Scene3")
            }
            this.prev_pressed = true
        } else {
            this.prev_pressed = false
        }
    }
}