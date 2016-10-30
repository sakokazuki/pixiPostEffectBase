let f = require('./test.glsl')();

class Test extends PIXI.AbstractFilter {
  constructor() {
    let uniforms = {
      map: {type: 'sampler2D', value: PIXI.Texture.fromImage('../img/light.png')},
      size: {type: '2f', value: [800, 800]},
      resolution: {type: '2f', value: [0, 0]},
      col: {type: '1f', value: 0.4},
      mouse: {type: '2f', value: [0, 0]}
    }
    super(null, f, uniforms);    
  }
}


export default Test