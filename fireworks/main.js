var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: {
        preload: preload,
        create: create
    }
}

function preload()
{
    this.load.image("cube", "../assets/cube.png").setSca
    this.emitters = []
}

function create()
{
    this.particles = this.add.particles("cube")
    this.emitters.push(this.particles.createEmitter({
        //frame: "cube",
        lifespan: 1000,
        speed: { min: 300, max: 400 },
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 0 },
        rotate: { start: 0, end: 360, ease: "Power2" },
        blendMode: "ADD",
        on: false
    }))

    for(let i = 0; i < this.emitters.length; i++)
    {
        this.time.addEvent({
            delay: 1000,
            callback: () => this.emitters[i].explode(6, 100*i + 100, 100),
            callbackScope: this,
            loop: true
        })
}
}

var game = new Phaser.Game(config)