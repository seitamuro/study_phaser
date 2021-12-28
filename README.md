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

## 物理エンジンの利用

生成したオブジェクトは自動的に