import Test from './filters/Test.js';

export default class Canvas {
  constructor() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, { transparent: true });
    document.getElementById("pixiview").appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    PIXI.loader
      .add('../img/light.png')
      .add('../img/black.png')
      .load(this.loadComplete.bind(this))
  }


  loadComplete(loader, resources) {
    

    const r = this.renderer
    window.onresize = (event)=>{
      var w = window.innerWidth;
      var h = window.innerHeight;

      //画面幅をシェーダーにわたす。 
      this.f.uniforms.resolution.value = [w, h];
      r.resize(w,h);
      this.bg.width = w;
      this.bg.height = h;
    }

    this.endOpAnim = false;
    if(window.pageYOffset > 800) this.endOpAnim = true;
    setTimeout( ()=>{
      this.endOpAnim = true;
    }, 3500);

    this.bg = PIXI.Sprite.fromImage('../img/bg.jpg');
    this.bg.width = this.width;
    this.bg.height = this.height;
    this.bg.interaction = false;
    this.stage.addChild(this.bg);

    this.f = new Test();
    this.stage.filters = [this.f];
    this.f.uniforms.resolution.value = [this.width, this.height];
    this.animate();
  }


  animate() {
    this.renderer.render(this.stage);

    //マウスの位置をシェーダーに渡す。
    let point = this.renderer.plugins.interaction.mouse.global;
    this.f.uniforms.mouse.value = [point.x, point.y];

    requestAnimationFrame(this.animate.bind(this)); 
  }

}