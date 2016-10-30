// yohawing smooth scroll

// new SmoothJumper({
//   jumpToPosition: 100, // 着地地点
//   duration: 500, // アニメーション時間
//   friction: 0.3, // 摩擦
//   anchor: $("a[href^=#]"), // クリックのターゲット
//   target: $("div[id]"), // 飛び先
// });


export default class SmoothJumper {
  constructor(option) {
    // default
    this.jumpToPosition = 150;
    this.duration = 300;
    this.friction = 0.2;
    this.anchor = $('a[href^=#]');
    this.target = $('div[id]');

    Object.keys(option).forEach(k => {
      if ({}.hasOwnProperty.call(option, k)) {
        this[k] = option[k];
      }
    });
  }

  init() {
    this.setEvent();
  }

  setEvent() {
    this.anchor.on('click', (e) => {
      e.preventDefault();
      const query = $(e.currentTarget).attr('href') || this.target;
      this.jump($(query));
    });
  }

  jump(query) {
    this.scrollTo(query);
  }

  scrollTo($tgt) {
    const startTime = performance.now();
    const $window = $(window);
    const destination = $tgt.offset().top;
    const from = $window.scrollTop();
    const direction = (destination - from < 0) ? -1 : 1;

    if (Math.abs(destination - from) < 100) return false;
    $window.scrollTop(destination - direction * this.jumpToPosition);

    const animate = () => {
      const animId = requestAnimationFrame(animate);
      const currentTime = performance.now();
      const diffTime = currentTime - startTime;
      const val = $window.scrollTop();
      $window.scrollTop(val + (destination - val) * this.friction);

      if (diffTime > this.duration || Math.abs(destination - val) < 1) {
        cancelAnimationFrame(animId);
      }
    };
    animate();
    return true;
  }

}
