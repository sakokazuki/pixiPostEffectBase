precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform sampler2D map;
uniform vec2 size;
uniform vec2 resolution;
uniform float col;
uniform vec2 mouse;
uniform float radius;

vec3 sphere = vec3(0, 0, 2);
float sphere_size = 1.5;

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 InRedFilter(vec4 color){
  color.r = ((-0.173921492860919-6.72968562163134)/(1.0+(pow(color.r/5.23149479901251, 0.908506168452606)))) + 6.72968562163134;

  if (color.g < 0.75) {
    color.g = 0.0627450980392157 + (3.18800565086584/(1.0+(pow(pow(color.g/18.6431654439471, -0.796394417021448), 0.624655293902083))));
  } else if (color.g < 0.85) {
    float a = 0.0627450980392157 + (3.18800565086584/(1.0+(pow(pow(color.g/18.6431654439471, -0.796394417021448), 0.624655293902083))));
    float b = 0.799150882805676 + (11.6428884424561/(1.0+(pow(pow(color.g/1.10296791661281, -31.1015118149487), 1.30253095367357))));
    color.g = mix(a, b, color.g * 10.0 - 7.5);
  } else {
    color.g = 0.799150882805676 + (11.6428884424561/(1.0+(pow(pow(color.g/1.10296791661281, -31.1015118149487), 1.30253095367357))));
  }

  color.b = color.g;
  return color;
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
  
  vec3 thremo;
  thremo = hsv2rgb(vec3(gray, 1., 1.));

  vec2 position = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  bool inOutCircle = inCircle (position, vec2(0., 0.), radius);
  bool inInCircle = inCircle (position, vec2(0., 0.), radius-0.02);
  if (inOutCircle && !inInCircle) {
    gl_FragColor = vec4(thremo, 1.);
  }else if(!inOutCircle){
    gl_FragColor = InRedFilter(col);
  }else{
    gl_FragColor = col;
  }

  
}

