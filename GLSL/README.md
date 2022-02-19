# GLSLとは

シェーダーを記述するための言語｡ゲームなどで使われる｡

# uniform

シェーダに外部から送られてくるパラメータを書くときに使われるもの｡

```glsl
uniform float t; // 時間経過が送れられてくる
uniform vec2 r; // リゾリューション(スクリーンサイズ)
```

# gl_FragColor

組み込み変数の一つ｡`vec4`型を利用して表示する色を指定する｡

```glsl
gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // rgba
```

# gl_FragCoord

GLSLが出力しようとしているピクセルの座標を表す｡`vec4`型｡

```glsl
float a = gl_FragCoord.x / 512.0
gl_FragColor = vec4(vec3(a), 1.0)
```

# tがうまく動作しないとき

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float r = abs(sin(u_time * 0.1));
    float g = abs(cos(u_time * 2.0));
    float b = (r + g) / 2.0;
    gl_FragColor = vec4(r, g, b, 1.0);
}
```

# 座標の正規化

画面上の座標を-1~1の範囲に変換する｡

```glsl
vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y)
```

# 光のオーブを描く

```glsl
vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y)
float l = 0.1 / length(p)
gl_FragColor = vec4(vec3(l), 1.0)
```

# for

GLSLのfor文の継続条件の場所に変数を利用していはいけない｡

```glsl
// for(float i = 0.0;i < j;i++) {
for(float i = 0.0;i < 5.0;i++) {
}
```