class Main extends Phaser.Scene
{
    constructor()
    {
        super("Main")
    }

    preload()
    {
        var cube = this.load.image("cube", "../assets/cube.png")
    }

    create()
    {
        var children = []
        var { width, height } = this.sys.canvas
        for(let i = 0;i < 10;i++)
        {
            children.push(this.add.sprite(0, 0, "cube").setDisplaySize(30, 30))
        }
        this.add.group(children)
        Phaser.Actions.PlaceOnCircle(
            children,
            new Phaser.Geom.Circle(width/2, height/2, 100)
        )
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