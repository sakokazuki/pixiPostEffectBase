precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform sampler2D map;
uniform vec2 size;
uniform vec2 resolution;
uniform float col;
uniform vec2 mouse;

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float aspect = resolution.y / resolution.x;
  vec2 uv = vTextureCoord;
  vec4 col = texture2D(uSampler, uv);
  float gray = (col.r + col.g + col.b) / 3.0;

  vec3 thremo;
  thremo = hsv2rgb(vec3(gray, 1., 1.));

  gl_FragColor = vec4(thremo, 1.);
}

