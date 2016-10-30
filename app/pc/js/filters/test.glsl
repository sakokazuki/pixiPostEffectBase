precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform sampler2D map;
uniform vec2 size;
uniform vec2 resolution;
uniform float col;
uniform vec2 mouse;


void main() {
  vec2 coord = vTextureCoord;

  vec4 color = texture2D(uSampler, coord);
  color.x += .4;
  gl_FragColor = vec4(color);
}