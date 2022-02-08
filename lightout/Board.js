export default class Board extends Phaser.GameObjects.Group {
    constructor(scene, row, col)
    {
        super(scene)
        this.row = row
        this.col = col
        this.board = []
        this.tile_width = 10
        this.tile_height = 10

        for(var i = 0;i < this.col;i++) {
            var r = []
            for(var j = 0;j < this.row;j++) {
                var tile = this.scene.add.rectangle(
                    this.tile_width * j, this.tile_height * i,
                    this.tile_width, this.tile_height, 0xff0000
                )
                tile.setData("x", j)
                tile.setData("y", i)
                tile.setInteractive()
                this.add(tile)
                r.push(tile)
            }
            this.board.push(r)
        }

        this.scene.input.on("gameobjectdown", (pointer, gameobject) => {
            console.log("hit")
            console.log(gameobject.getData("x") + " " + gameobject.getData("y"))
            gameobject.setFillStyle(0x0000ff)
        })
    }
}