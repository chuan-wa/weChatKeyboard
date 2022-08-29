// components/keyboard/keyboard.js
Component({
  /**
   * 组件的属性列表
   */
  lifetimes:{
    attached:function(){
      this.setData({
        KeyboardWordsKeys1:this.data.keyKeyboardTotalWordsKeys.slice(0,10),
        KeyboardWordsKeys2:this.data.keyKeyboardTotalWordsKeys.slice(10,19),
        KeyboardWordsKeys3:this.data.keyKeyboardTotalWordsKeys.slice(19,26),
        KeyboardWordsKeys1CAP:this.data.keyKeyboardTotalWordsKeys.slice(26,36),
        KeyboardWordsKeys2CAP:this.data.keyKeyboardTotalWordsKeys.slice(36,45),
        KeyboardWordsKeys3CAP:this.data.keyKeyboardTotalWordsKeys.slice(45,52),
        KeyboardSignKeys1:this.data.keyKeyboardTotalWordsKeys.slice(52,62),
        KeyboardSignKeys2:this.data.keyKeyboardTotalWordsKeys.slice(62,72),
        KeyboardSignKeys3:this.data.keyKeyboardTotalWordsKeys.slice(72,80),
        KeyboardSignKeys4:this.data.keyKeyboardTotalWordsKeys.slice(80,84),
      });
      var tempDict={};
      var tempDictCAP={};
      var tempDictSignal={};
      this.data.keyKeyboardTotalWordsKeys.forEach(function(value,index, array){
        tempDict[value]=false
      })
      this.setData({
        showkeyInKeyboardTotalWordsKeys:tempDict
      })
      
    }

  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

      content: [], // 输入的金额
      defaultContent: '请输入点什么', // 默认内容
      KeyboardKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'ABC', '0', ''],
      keyKeyboardTotalWordsKeys:['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',
      'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M',
      '!','@','#','$','%','^','&','*','(',')','\'','\"','=','_',':',';','?','~','|','·','+','-','\\','/','[',']','{','}',',','.','<','>'],
      //小写键盘的每一行
      KeyboardWordsKeys1:[],    KeyboardWordsKeys2:[],    KeyboardWordsKeys3:[],
      //大写键盘的每一行
      KeyboardWordsKeys1CAP:[],    KeyboardWordsKeys2CAP:[],    KeyboardWordsKeys3CAP:[],
      //符号键盘每一行
      KeyboardSignKeys1:[], KeyboardSignKeys2:[], KeyboardSignKeys3:[],KeyboardSignKeys4:[],
      showkeyInKeyboardTotalWordsKeys:{},
      showkeyInKeyboardTotalWordsKeysCAP:{},
      keyShow: true,  // 是否展示数字键盘
      keyWordShow:false,  // 是否展示小写字母键盘
      keyWordsCapShow:false,  // 是否展示大写字母键盘
      keySignShow:false,    //是否展示字符键盘
      cursorIndex: '', // 插入光标位置
      contentLengthMax: 100, // 最大长度6(不包含.)
      popBottom:[470,370,276,182],  //弹窗距离底部
      popLeftMove:[74],   //弹窗间隔
      timer:null,
      intervalFun:null,
      keyMargin:4,
      keyWidth:63,


  },

  /**
   * 组件的方法列表
   */
  methods: {
    hindKeyboard() {
      this.setData({ keyShow: false,keyWordsCapShow:false,keyWordShow:false,keySignShow:false  });
      // console.log(this.data.keyShow)
    },
    
    //显示数字键盘
    showKeyboard() {
      this.setData({ keyShow: true,keyWordsCapShow:false,keyWordShow:false,keySignShow:false });
      // console.log(this.data.keyShow)
    },
    //显示大写字母键盘
    showWordsCapKeyboard(){
      this.setData({keyShow: false,keyWordsCapShow:true,keyWordShow:false,keySignShow:false})
    },
    //显示小写字母键盘
    showWordKeyboard(){
      this.setData({keyShow: false,keyWordsCapShow:false,keyWordShow:true,keySignShow:false})
    },
    //显示字符键盘
    showSignKeyboard(){
      this.setData({ keyShow: false,keyWordsCapShow:false,keyWordShow:false,keySignShow:true});
    },
    //读取按下的键的值，并作出回应
    keyTap(e) {
      let { keys } = e.currentTarget.dataset
      console.log(keys)
      switch (keys) {
          case'ABC':
          this.showWordKeyboard();
          break
          case'小写':
          this.showWordKeyboard();
          break
          case'123':
          this.showKeyboard();
          break
          case'大写':
          this.showWordsCapKeyboard();
          break
          case'#+=':
          this.showSignKeyboard();
          break
        default:
//键盘上的其他元素
          break
      }
    },
    showKeyTap(e){
      let item=e.currentTarget.dataset.keys
      var tempDict=this.data.showkeyInKeyboardTotalWordsKeys;
      tempDict[item]=!tempDict[item];
      // console.log(tempDict)
      
      //console.log(this.data.showkeyInKeyboardTotalWordsKeys[item])
      
      this.setData({showkeyInKeyboardTotalWordsKeys:tempDict})
    },
    //下面三个函数实现长按删除键，快速删除
    pressCountTime(e){
      this.keyTap(e);
      var that=this;
      this.data.timer=setTimeout(function(){that.continousDelete(e);}, 400);
      this.setData({
        timer:this.data.timer
      })
    },
    continousDelete(e){
      var that=this;
      this.data.intervalFun=setInterval(function(){that.continousDeleteTap(e);},50);
      this.setData({
        intervalFun:this.data.intervalFun
      })
    },
    stopPress(e){
      clearInterval(this.data.intervalFun);
      clearTimeout(this.data.timer)
      this.setData({
        intervalFun:null,
        timer:null
      })
    },
    continousDeleteTap(e){ 
      // let content = this.data.content.join(''),   // 转为字符串
      // strLen = content.length, 
      // { cursorIndex, contentLengthMax } = this.data
      // if(cursorIndex > 0 && cursorIndex !== strLen) {
      //   // 从插入光标开始删除元素
      //   this.data.content.splice(cursorIndex - 3, 3)
      //   content = this.data.content.join('')
      // }else{
      //   content = content.substr(0, content.length - 3)
      // }
      // if(!strLen || cursorIndex === strLen){    // 插入光标位置重置
      //   this.setData({ cursorIndex: '' })
      // }
      // this.setData({ content: content.split('') }) 
      console.log("快速删除这部分功能未实装")
    },
    normalTap(e){
    },

  }
})
