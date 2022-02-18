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
     * @param {number} shuffle_num the count of random tap for initializing.
     */
    constructor(scene, x, y, row, col, tile_width, tile_height, shuffle_num=10)
    {
        this.scene = scene
        this.x = x
        this.y = y
        this.row = row
        this.col = col
        this.tile_width = tile_width
        this.tile_height = tile_height
        this.board = []
        this.gameClearCallback = () => {console.log("Game Clear!")}
        this.count = 0 // count of click

        for(var i = 0;i < this.col;i++)
        {
            var rows = []
            for(var j = 0;j < this.row;j++)
            {
                var tile = new Tile(
                    this.scene, 
                    this.x + j*this.tile_width,
                    this.y + i*this.tile_height,
                    this.tile_width,
                    this.tile_height,
                    "on"
                )
                tile.setInteractive()
                tile.setData("board_x", j)
                tile.setData("board_y", i)
                rows.push(tile)
            }
            this.board.push(rows)
        }

        // initialize board
        for(var i = 0;i < shuffle_num;i++)
        {
            var x = Phaser.Math.RND.between(0, this.row-1)
            var y = Phaser.Math.RND.between(0, this.col-1)
            console.log(x, y)
            this.tapTile(x, y)
        }

        this.scene.input.on("gameobjectdown", (_pointer, object) => {
            if (object instanceof Tile)
            {
                var x = object.getData("board_x")
                var y = object.getData("board_y")

                this.tapTile(x, y)
                if (this.isGameClear())
                {
                    this.gameClearCallback()
                }
            }
        })
    }

    /**
     * tap tile
     * 
     * @param {number} x position x of tile
     * @param {number} y position y of tile
     */
    tapTile(x, y)
    {
        this.getTile(x, y).tap()

        if (x > 0) {
            this.getTile(x-1, y).tap()
        }

        if (y > 0) {
            this.getTile(x, y-1).tap()
        }

        if (y < this.col - 1) {
            this.getTile(x, y+1).tap()
        }

        if (x < this.row - 1) {
            this.getTile(x+1, y).tap()
        }
    }

    /**
     * check game clear
     * 
     * @returns {boolean} if it is game clear, returns true.
     */
    isGameClear()
    {
        for(var i = 0;i < this.row;i++)
        {
            for(var j = 0;j < this.col;j++)
            {
                if (this.getTile(i, j).status == "off")
                {
                    return false
                }
            }
        }

        return true
    }

    /**
     * Get Tile
     * 
     * @param {number} x position x of tile in board
     * @param {number} y position y of tile in board
     * 
     * @returns {Tile} tile which is determined by position
     */
    getTile(x, y)
    {
        return this.board[y][x]
    }

    /**
     * set callback for game clear
     * 
     * @param {function} callback
     */
    setGameClearCallback(callback)
    {
        this.gameClearCallback = callback
    }
}