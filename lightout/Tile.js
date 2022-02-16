export default class Tile
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
        // define fields
        this.scene = scene
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.status = "off"
        this.color_list = {
            "on": 0xffff00,
            "off": 0x888888
        }

        // add tile to scene
        this.tile = this.scene.add.rectangle(
            self.x,
            self.y,
            self.width,
            self.height,
            this.getColor()
        )

        // enable collision
        this.tile.setInteractive()

        // callback for clicked
        this.tile.on("click", () => {
            this.tap()
        })

        // if clicked, emit "click"
        this.scene.input.on("gameobjectdown", (_pointer, gameObjects) => {
            gameObjects.emit("click")
        })
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

        this.tile.setFillStyle(this.getColor())
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