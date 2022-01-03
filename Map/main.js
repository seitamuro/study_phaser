class Main extends Phaser.Scene
{
    constructor()
    {
        super("Main")

        this.grid = [
            [1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ]

        this.display_grid = []

        this.color = [0xff0000, 0x00ff00, 0x0000ff]
    }

    preload()
    {
        this.load.image("cube", "../assets/cube.png")
    }

    create()
    {
        this.drawGrid(100, 100)

        this.input.on("gameobjectdown", (pointer, gameObject) => {
            console.log("clicked!")
            this.fillTile(gameObject, 2)
            console.log(this.grid)
        })
    }

    drawGrid(sx, sy)
    {
        for(let i = 0;i < this.grid.length;i++)
        {
            var row = []
            for(let j = 0;j < this.grid[i].length;j++)
            {
                var color = this.grid[i][j]
                var tile = this.add.sprite(i*10 + sx, j*10 + sy, "cube").setTint(this.color[color])
                tile.setData("x", i)
                tile.setData("y", j)
                tile.setInteractive()
                row.push(tile)
            }
            this.display_grid.push(row)
        }
    }

    fillTile(gameObject, color)
    {
        var x = gameObject.getData("x")
        var y = gameObject.getData("y")
        gameObject.setTint(this.color[color])
        this.grid[x][y] = color
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Main]
}

var game = new Phaser.Game(config)