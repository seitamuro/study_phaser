import Board from "./Board.js"

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super("Main")
    }

    create() {
        var board = new Board(this.physics.world, this, 10, 10)
    }
}