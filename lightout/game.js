import Tile from "./Tile.js"
export default class Game extends Phaser.Scene
{
    constructor()
    {
        super("Main")
    }

    create() {
        var tile = new Tile(this, 0, 0, 10, 10)
    }
}