precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform sampler2D map;
uniform vec2 size;
uniform vec2 resolution;
uniform float col;
uniform vec2 mouse;

vec3 sphere = vec3(0, 0, 2);
float sphere_size = 1.5;

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


bool inCircle(vec2 position, vec2 offset, float size) {
    float len = length(position - offset);
    if (len < size) {
        return true;
    }
    return false;
}


void main() {
  float aspect = resolution.y / resolution.x;
  vec2 uv = vTextureCoord;
  vec4 col = texture2D(uSampler, uv);
  float gray = (col.r + col.g + col.b) / 3.0;

  //マスク関連
  vec3 point;
  vec3 normal;
  
  gl_FragColor = vec4(0.);



  vec3 thremo;
  thremo = hsv2rgb(vec3(gray, 1., 1.));

  vec2 position = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  if (inCircle (position, vec2(0., 0.), 0.8)) {
    gl_FragColor = vec4(thremo, 1.);
  }
  // if(dist > 0.){
  //   gl_FragColor = vec4(thremo, 1.);
  // }
  // gl_FragColor = vec4(cycle);
  
}



