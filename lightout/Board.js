import Tile from "./Tile.js"

export default class Board
{
    /**
     * Board of Lights out
     * 
     * @param {Phaser.Scene} scene scene of Phaser
     * @param {number} x position x of board
     * @param {number} y position y of board
     * @param {number} row row of board
     * @param {number} col col of board
     * @param {number} tile_width width of tile
     * @param {number} tile_height height of tile
     */
    constructor(scene, x, y, row, col, tile_width, tile_height)
    {
        this.scene = scene
        this.x = x
        this.y = y
        this.row = row
        this.col = col
        this.tile_width = tile_width
        this.tile_height = tile_height
        this.board = []
        this.count = 0 // count of click

        for(var i = 0;i < this.col;i++)
        {
            var rows = []
            for(var j = 0;j < this.row;j++)
            {
                var tile = new Tile(this.scene, j*this.tile_width, i*this.tile_height, this.tile_width, this.tile_height)
                tile.setInteractive()
                rows.push(tile)
            }
            this.board.push(rows)
        }

        this.scene.input.on("gameobjectdown", (_pointer, object) => {
            if (object instanceof Tile)
            {
                object.tap()
            }
        })
    }
}