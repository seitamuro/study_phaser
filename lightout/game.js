import Board from "./Board.js"
import Tile from "./Tile.js"

class MyRectangle extends Phaser.GameObjects.Rectangle {
    constructor(scene)
    {
        super(scene, 0, 0, 10, 10, 0xff0000)

        this.scene.add.existing(this)
    }
}
export default class Game extends Phaser.Scene
{
    constructor()
    {
        super("Main")
    }

    create() 
    {
        var board = new Board(this, 0, 0, 5, 5, 10, 10)
    }
}