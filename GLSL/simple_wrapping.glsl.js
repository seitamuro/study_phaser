#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 30
float fbm(in vec2 st) {
    float value = 0.;
    float amplitude = .8;
    float frequency = 0.;
    
    mat2 rotate = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));

    for(int i = 0;i < OCTAVES;i++) {
        value += amplitude*noise(st);
        st *= 1.5 * rotate;
        amplitude /= 2.;
    }

    return value;
}

float pattern (vec2 _st) {
    float value = 0.;
    vec2 q = vec2(fbm(_st + vec2(1., -1.) + vec2(0., 0.)), fbm(_st*2. + vec2(5., 5.)));
    return fbm(_st + q*5.);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x += u_time/10.;
    st.x *= u_resolution.x/u_resolution.y;

    gl_FragColor = vec4(pattern(st*6.), pattern(st*3.), pattern(st*5.), 1.0);
}