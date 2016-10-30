'use strict'

export default class Browser {

  constructor() {
    this.isIE = false
    this.isIE8 = false
    this.isFirefox = false
    this.isMobile = false
    this.isAndroid = false
    this.isSafari = false
    this.isiOS = false
    this.init()
  }

  init(){
    this.userAgent = navigator.userAgent.toLowerCase()
    if(this.userAgent.match(/msie ([\d\.]+)/)){
      this.isIE = true
      if(matched = this.userAgent.match(/msie ([\d\.]+)/)){
        version = matched[1].split('.')
        this.isIE8 = (version[0] ^ 0) == 6
        this.isIE8 = (version[0] ^ 0) == 7
        this.isIE8 = (version[0] ^ 0) == 8
        this.isIE9 = (version[0] ^ 0) == 9
        this.isIE10 = (version[0] ^ 0) == 10
        this.isIE11 = (version[0] ^ 0) == 11
      }
    }else if(this.userAgent.match('rv:11.0')){
      this.isIE = true
    }

    else if(this.userAgent.match('chrome')){
      this.isChrome = true
    }

    else if(this.userAgent.match('safari')){
      this.isSafari = true
    }

    else if(this.userAgent.match('firefox')){
      this.isFirefox = true
    }


    if(this.userAgent.search(/iphone/) != -1 || this.userAgent.search(/ipad/) != -1 || this.userAgent.search(/ipod/) != -1){
      this.isMobile = true
      this.isiOS = true
    }
    else if(this.userAgent.search(/android/) != -1){
      this.isMobile = true
      this.isAndroid = true
    }

    //trace '@isIE = '+ @isIE
    //trace '@isIE8 = '+ @isIE8
    //trace '@isFirefox = '+ @isFirefox
    //trace '@isMobile = '+ @isMobile
    //trace '@isAndroid = '+ @isAndroid
    //trace '@isiOS = '+ @isiOS
    //alert @isIE8
  }  


  // redirect: (hash) =>
  //   if @isMobile
  //     location.href = location.host + '/#' + hash

}