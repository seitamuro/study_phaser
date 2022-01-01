export default class FireWork extends Phaser.GameObjects.Group
{
    constructor(scene)
    {
        super(scene)

        this.number = 10
        this.color = 0xff0000
    }

    start(x, y, r) {
        this.circle = Phaser.Geom.Circle(x, y, r)
        for(var i = 0;i < this.number; i++)
        {
            this.add(new Phaser.Geom.Rectangle(x, y, 10, 10))
        }
        Phaser.Actions.PlaceOnCircle(this.children, this.circle)
    }
}