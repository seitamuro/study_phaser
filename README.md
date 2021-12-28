# 画像の読み込み
```javascript
function preload() {
    this.load.image("sky", "assets/sky.png")
}
```
第1引数で読み込んだ画像を呼び出すためのキー､第2引数で画像の場所を指定する｡

# 画像を置く
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