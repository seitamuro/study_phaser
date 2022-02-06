export default class Board extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, num_row, num_col)
    {
        super(world, scene)
        this.num_row = num_row
        this.num_col = num_col
    }
}