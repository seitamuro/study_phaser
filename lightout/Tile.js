export default class Tile extends Phaser.GameObjects.Rectangle
{
    /**
     * Create and add tile to scene.
     * 
     * @param {Phaser.Scene} scene Scene of Phaser
     * @param {number} x position x of tile
     * @param {number} y position y of tile
     * @param {number} width width of tile
     * @param {number} height height of tile
     */
    constructor(scene, x, y, width, height)
    {
        super(scene, x, y, width, height)

        // define fields
        this.color_list = {
            "on": 0xffff00,
            "off": 0x888888
        }
        this.status = Phaser.Math.RND.pick(Object.keys(this.color_list))

        // add tile to scene
        this.scene.add.existing(this)

        // set color
        this.setFillStyle(this.getColor())
    }

    /**
     * Return color of tile. This is determined by status 'on' or 'off'.
     * 
     * @returns {number} the color of tile.
     */
    getColor()
    {
        return this.color_list[this.status]
    }

    /**
     * Callback for clicking tile.
     */
    tap()
    {
        this.switchStatus()

        this.setFillStyle(this.getColor())
    }

    /**
     * Switching status.
     */
    switchStatus()
    {
        if (this.status == "on")
        {
            this.status = "off"
        } else {
            this.status = "on"
        }
    }
}