export default class Tweens extends Phaser.Scene {
    constructor()
    {
        super("tweens")

        this.x = 0
        this.tints = [0xff0000, 0x00ff00, 0x0000ff, 0x00f0f0, 0xf0f000]
    }

    preload()
    {
        this.load.image("sphere", "../assets/sphere.png")
    }

    create()
    {
        var {width, height} = this.sys.canvas

        this.time.addEvent({
            delay: 10,
            callback: this.throw,
            callbackScope: this,
            loop: true
        })

        var sphere = this.add.image(width / 2, height / 2, "sphere")

        this.tweens.add({
            targets: sphere,
            scaleX: 2,
            scaleY: 2,
            duration: 2000,
            ease: "Power1",
            yoyo: true,
            loop: true
        })
    }

    throw()
    {
        this.x += 3
        var {width, height} = this.sys.canvas
        var sphere = this.add.image(this.x, height, "sphere").setDisplaySize(32, 32)
        sphere.setTint(Phaser.Math.RND.pick(this.tints))

        if (this.x > width)
        {
            this.x = 0
        }

        this.tweens.add({
            targets: sphere,
            y: 10,
            duration: Phaser.Math.Between(500, 1000),
            ease: "Power1",
            yoyo: true,
            onComplete: () => {
                sphere.destroy()
            }
        })
    }
}