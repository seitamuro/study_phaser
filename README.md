# グラフィック

## グラフィック描写の準備

[ここ](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Graphics.html)に関数などが書かれている｡基本的に`graphics`に書くものの色や線のスタイルを指定し､具体的にどう書くかを関数で指定する｡

```javascript
var graphics = this.add.graphics(オプション)
```

## 塗りつぶされた円を書く

`Phaser.Geom.Circle(x座標, y座標, 半径)`｡単にシーン上に追加する場合は`this.add.circle`関数を利用すると良い｡この関数は以下の処理をまとめたものなので､これを別のクラスとして分割する場合はシーンの`children`に追加することを忘れない｡ここでの`children`は`displayList`を示しており､ここに追加した`GameObject`のみが画面上に表示される｡

```javascript
var circle = new Phaser.GameObjects.Arc(scene, x, y, radius, startAngle, endAngle, antiClockwise, fillColor, fillAlpha)
this.children.add(circle) // ここでのthisはPhaser.Scene､childrenはPhaser.displayList
```

```javascript
var circle = new Phaser.Geom.Circle(400, 300, 100)
var graphics = this.add.graphics({fillStyle: { color: 0xff0000 }})
graphics.fillCircleShape(circle)
```

もしくは`scene.add.existing`を利用して`Phaser.GameObjects.Circle`や`Phaser.GameObjects.Rectangle`を追加する｡

```javascript
var rectangle = new Phaser.GameObjects.Rectangle(0, 0, 10, 10, 0xff0000)
this.add.existing(rectangle)
```

```javascript
class MyRectangle extends Phaser.GameObjects.Rectangle
{
    constructor(scene)
    {
        super(scene, 0, 0, 10, 10, 0xff0000)

        this.scene.add.existing(this)
    }
}

var rectangle = new MyRectangle(this)
```

## テキスト

```javascript
this.scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#ffffff" })
this.scoreText.setText("score: " + this.score)
```

## オブジェクトの深さ

`setDepth`関数を利用してオブジェクトのz-indexの値を指定する｡数値が大きいほど前面に表示される｡

```javascript
gameObject1.setDepth(0)
gameObject2.setDepth(100) // こっちが上
```

# スプライト
## 画像の読み込み
```javascript
function preload() {
    this.load.image("sky", "assets/sky.png")
}
```
第1引数で読み込んだ画像を呼び出すためのキー､第2引数で画像の場所を指定する｡

## 画像を置く
```javascript
function create() {
    this.add.image(400, 300, "sky")
}
```
preload関数内で読み込んだ画像を配置する｡このとき､画像の中心を配置する座標を第1引数と第2引数で指定し､画像のキーを第3引数で指定している｡座標の基準は以下の方法で左上に指定することができる｡

```javascript
function create() {
    this.add.image(400, 300, "sky").setOrigin(0, 0)
}
```

## スプライトを円状に配置する

```javascript
var children = [this.add.sprite(0, 0, "cube"), this.add.sprite(0, 0, "cube")]
Phaser.Actions.PlaceOnCircle(
    children,
    new Phaser.Geom.Circle(10, 10, 100)
)
```

# 物理エンジン

## 設定

configの中にどのような物理エンジンを利用するかを指定する｡
```javascript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
            debug: false
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
```

`physics`内で設定のプリセット`arcade`を設定し､それをデフォルトで使用するように指定している｡

## staticモードのオブジェクト

重力などの影響を受けるオブジェクトは`dynamic`モードのオブジェクトであり､これらの影響を受けないオブジェクトは`static`モードのオブジェクトである｡

生成したオブジェクトは自動的にデフォルトの物理エンジンの挙動が適用される｡これを外す場合､以下のように`this.physics.add.staticGroup`に含める必要がある｡
```javascript
platforms = this.physics.add.staticGroup()
platforms.create(400, 568, "ground")
```

## オブジェクトを複数個追加する(グループで管理する)

```javascript
stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y:0, stepX: 70 }
})
```

```javascript
class Targets extends Phaser.Physics.Arcade.Group
{
    constructor(world, scene) 
    {
        super(world, scene)

        this.classType = Target
    }
}
```

## グループへオブエジェクトを追加する

`add`関数を利用してオブジェクトを物理演算のグループに追加するとそれまでに設定した物理演算用のパラメータがリセットされることに注意｡

```javascript
var group = new Phaser.Physics.Arcade.Group()
group.add(gameObject)
```

## オブジェクト複数に対して処理を行う

ここでは､各オブジェクトのBounceYをセットする
```javascript
stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
})
```

## 存在するオブジェクトの数を取得する

```javascript
stars.children.countActive()
```

## 当たり判定の更新

画像のサイズがそのまま当たり判定になる｡画像を拡大した場合､`refreshBody`関数を呼び出さなければ当たり判定が更新されない｡
```javascript
platforms = this.physics.add.staticGroup()
platforms.create(400, 568, "ground").setScale(2).refreshBody()
```

## 接触判定の追加

```
this.physics.add.collider(player, platforms)
```

## 各辺の当たり判定

```javascript
player.body.touching.down
```

## オブジェクトがあたったときの処理を指定する

ここでは`this.physics.add.overlap`関数を利用して指定する｡ここで､第1引数と第2引数で衝突するオブジェクト､第3引数で衝突したときのコールバック関数を渡す｡

```javascript
const collectStar = (player, star) => {
    star.disableBody(true, true)
}

this.physics.add.overlap(player, stars, collectStar, null, this)
```

# アニメーション

## アニメーションの読み込み

連続画像がある場合はそれらを一定の幅で切り分けることでアニメーションを生成することができる｡実際のアニメーションは切り取った画像をどこからどこまで利用するのかを指定することで生成する｡

```javascript
this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48})
```

## アニメーションの生成

```javascript
this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start:0, end: 3}),
    frameRate: 10,
    repeat: -1
})
```

# シーン
## シーンの生成

`preload`関数､`create`関数､`update`関数を一組としたものをシーンという｡タイトル､ゲーム本編､リザルト画面などのように画面ごとにシーンを生成すると便利｡

```javascript
class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1")
    }

    preload() {}
    create() {}
    update() {}
}
```

上記の方法でシーンを生成することができ､このシーンを`config`にわたすことでシーン遷移ができるようになる｡一番はじめに渡したシーンからゲームは始まる｡

```javascript
import Scene1 from "./Scene1.js"
import Scene2 from "./Scene2.js"
import Scene3 from "./Scene3.js"

var config = {
    type: Phaser.AUTO,
    backgroundColor: "#888888",
    width: 800,
    height: 600,
    scene: [Scene1, Scene2, Scene3]
}

var game = new Phaser.Game(config)
```

## シーン遷移

`this.scene.start("シーン名")`でシーンを遷移できる｡遷移できるシーンは`config`で指定したもののみ｡

# 入力

## カーソル

```javascript
cursors = this.input.keyboard.createCursorKeys()

if (cursors.left.isDown) {
} else if (cursors.right.isDown) {
}
```

## マウス

```javascript
this.input.activePointer.isDown
```

## 一回マウスクリックされたとき

```javascript
this.input.once("pointerdown", () => {
    console.log("mouse click!")
})
```

# システム

## キャンバスのサイズを取得

```javascript
var { width, height } = this.sys.canvas
```

# イベント

## 時間ごとのイベント
```javascript
this.scene.time.addEvent({
    delay: 1000,
    callback: this.spawn,
    callbackScope: this,
    loop: true
})
```

## onとemit
`on(イベント名, コールバック)`関数で`emit`関数で指定されたイベントが発生したときの処理を行う｡

```javascript
gameObject.on("clicked", () => {
    console.log("clicked!")
})

gameObject.emit("clicked")
```

# Tweens

指定した値になるように時間ごとに値を段階的に変化させるもの｡`targets`に渡したオブジェクトのプロパティを`this.tweens.add`関数で指定する｡ここでは`sphere`の`y`が10になるように値を段階的に変化させている｡

```javascript
this.tweens.add({
    targets: sphere,
    y: 10,
    duration: Phaser.Math.Between(500, 1000),
    ease: "Power1",
    yoyo: true,
    onComplete: () => {
        sphere.destroy()
    }
})
```

|名称|概要|
|---|---|
|x|x座標|
|y|y座標|
|scaleX|x方向の拡大率|
|scaleY|y方向の拡大率|

# パーティクル

パーティクルは`this.add.particles`関数を使ってパーティクルとして利用するスプライトを指定し､エミッターを生成する際にパーティクルの挙動を指定する｡発生は`explode`関数を利用する｡

```javascript
this.particles = this.add.particles("cube")
this.emitter = this.particles.createEmitter({
    lifespan: 1000,
    speed: { min: 300 max: 400 },
    alpha: { start: 1, end: 0 },
    scale: { start: 0.5, end: 0},
    rotate: { start: 0, end: 360, ease: "Power2" },
    blendMode: "ADD",
    on: false
})
this.emitter.explode(6, 100, 100)
```