# Vue.js Project
---

## Project 13
使用Vue.js製作動態電影選擇介面


---

## 電影選擇介面
* 藉由滾輪左右滑動卡片
* 結合axios載入資料 / 呈現網頁
* 使用TweenMax輔助動態

![](https://i.imgur.com/OTTm6y5.png)

----

## 1. AJAX存取資料
* 使用axios動態載入資料
* 生命週期介紹
```javascript=
created(){
    let apiUrl = "https://...."
    axios.get(apiUrl).then(res=>{
      this.movies=res.data // [{name: "..."},...]
    })
},
```
https://vuejs.org/v2/guide/instance.html

----

## 2. this.$nextTick
* 跟其他網頁操作函式庫綁定
* 等待Vue更新html後執行
```javascript=
methods:{
    updateMovie(newMovie){
        this.movie=newMovie
        //網頁元素還沒實際更新
        //nextTick->根據資料動態更新元素後
        this.$nextTick(()=>{
            ///...html已更新
            // 使用jquery, tweenmax等操作網頁
        })
    }
}
```

----

## 3. 將滑鼠轉換為左右滾動
* wheel.prevent 取得滾輪事件
* TweenMax 處理左右動態
```htmlmixed=
.movie(@wheel.prevent="wheel($event)")
```
```javascript=
wheel(evt){
  TweenMax.to(".cards",0.8,{
    left: "+="+evt.deltaY*2+"px"
  })
},
```

----

## 4. TweenMax.from + $event
* $event取得觸發事件元件位置
* TweenMax製作靈活動態
```javascript=
TweenMax.from(".buybox",0.8,{
  left: $(evt.target).offset().left,
  top:  $(evt.target).offset().top,
  opacity: 1,
  ease: Power1.easeIn
})
```


----

## 5. 增強動態與使用icon
* font awesome
* animate.css

---
## 6. 寫簡易的crul功能 api
![](https://i.imgur.com/wqpgt5m.png)


---
### 若遇到cors的問題
***加入corsheader***

![](https://i.imgur.com/JTLzJbP.png)


---

## 7. 串接django rest-ful api

![](https://i.imgur.com/DSSTbJx.png)


---

![](https://i.imgur.com/skcwZGT.png)


---
## 成功串接
![](https://i.imgur.com/IVx8j8y.png)

# codepen
https://codepen.io/pingping0203/pen/KKzEqYJ?editors=0111
