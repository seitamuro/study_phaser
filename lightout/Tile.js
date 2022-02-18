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
     * @param {string} status state of tile. 'on' or 'off'.
     */
    constructor(scene, x, y, width, height, status=undefined)
    {
        super(scene, x, y, width, height)

        // define fields
        this.color_list = {
            "on": 0xffff00,
            "off": 0x888888
        }
        var keys = Object.keys(this.color_list)
        if (!keys.includes(status)) {
            this.status = Phaser.Math.RND.pick(keys)
        } else {
            this.status = status
        }

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