<template lang='pug'>
  #app
    transition(name="page", mode="out-in")
      router-view(:key="$route.path")
    .apptitle Vue.js Theater
    .mouse(@wheel.prevent="wheel")
      .cards(:class="{isCartOpen: isCartOpen}")
        .card(v-for="pf in portfolios")
          .left  
            .cover(:style="bgcss(pf.cover)")
          .right
            h2 {{ pf.name }}
            h4 {{ pf.type }}
            p {{ pf.description }}
            .price {{ pf.price }}$
              button.add(@click="addCart(pf,$event)") + Add To My Cart

    .fixed-control(@click="isCartOpen=!isCartOpen")
      font-awesome-icon(icon="shopping-cart").icon
      span {{ cart.length }}
    .control(:class="{isCartOpen: isCartOpen}")
      .panel
        h2 My Movie Cart
        ul
          li(v-for="(pf,pid) in cart")
            .thumbnail(:style="bgcss(pf.cover)")
            h3 {{pf.name}}
              .price {{pf.price}}
              .remove(@click="cart.splice(pid,1)") -
          li(v-if='!cart.length')
            h3 Your cart is empty!
        hr
        h2 {{totalPrice}}$


    .buybox(:style="bgcss(currentPortfolio.cover)",v-if="currentPortfolio")
</template>

<script>
import { gsap, TweenMax } from 'gsap'
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return {
      portfolios: [],
      cart: [],
      currentPortfolio: null,
      isCartOpen: false,
    }
  },
  created(){
    let apiUrl = 'http://127.0.0.1:8000/api/task-list/'
    axios.get(apiUrl).then(res=>{
      this.portfolios = res.data
    })
  },
  computed:{
    totalPrice(){
      return this.cart.map(pf=>pf.price).reduce((total,p)=>total+p,0)
    }
  },
  methods: {
    jump(){
      this.$router.push("/PageOrder")
    },
    bgcss: function (url) {
      return {
        'background-image': 'url('+url+')',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    },
    wheel: function (evt) {
      console.log(evt)
      TweenMax.to('.cards',0.8,{
        left: '+='+ evt.deltaY*3+ 'px'
      })
    },
    addCart: function (portfolio,evt) {
      this.currentPortfolio = portfolio
      this.$nextTick(()=>{
        TweenMax.from('.buybox',0.8,{
          left: evt.pageX,
          top: evt.pageY,
          opacity: 1,
        })
        setTimeout(()=>{
          this.cart.push(portfolio)
          console.log(this.cart)

        },800)
      })
    }
  },
  watch: {
    cart: function (){
      TweenMax.from('.icon',0.3,{
        scale: 0.5
      })
    }
  }
}
</script>

<style lang='sass'>
.page-enter-active, .page-leave-active
  transition: 0.5s
.page-enter, .page-leave-to
  opacity: 0
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&display=swap')
@mixin size($w,$h:$w)
  width: $w
  height: $h
@mixin flexCenter
  display: flex
  justify-content: center
  align-items: center
@mixin bxshadow
  box-shadow: 0px 5px 25px 5px rgba(black,0.2)      

@mixin fixedPos($l,$t)
  position: fixed
  left: $l
  top: $t  
*
  vertical-align: center
  outline: none  
  // border: solid 1px black
html,body
  height: 100%
  margin: 0
  font-family: 'Roboto'

#app
  +size(100%)
  background-color: #111
  // color: white
  display: flex
.apptitle
  +fixedPos(30px,30px)
  color: white
  font-size: 30px
  font-weight: bold
.appfolios
  flex: 1

.cards
  +flexCenter
  height: 100%
  justify-content: left
  margin-left: 20vw
  margin-right: 20vw
  position: relative
  
  &.isCartOpen
    transition: 0.5s
    transform: scale(0.8)

.card
  margin: 60px
  +size(460px,auto)
  display: inline-flex
  flex-shrink: 0
  background-color: rgba(white,0.9)
  transition: 0.5s
  border-radius: 5px
  +bxshadow
  padding: 20px
  padding-bottom: 0px
  color: #888

  .left 
    flex: 1
    transition: 0.5s
    margin-bottom: -15px
    .cover
      +size(180px,240px)
      +bxshadow
      border-radius: 5px
      position: relative
      top: -50px
  .right 
    flex: 2
    padding: 20px
    padding-top: 10px
    h2 
      margin: 0
      font-weight: bold
      font-size: 24px
      color: #444
    h4
      margin-top: 10px
      margin-bottom: 10px
      opacity: 0.8
      font-weight: normal
    p
      font-size: 13px
      line-height: 1.3 
      text-align: justify
      opacity: 0.8
      min-height: 5em
    .price
      display: inline-block
      margin-right: 20px
    button
      padding: 5px 10px
      background-color: #bbb
      color: rgba(white,0.9)
      border-radius: 50px
      cursor: pointer
      margin-left: 30px
      transition: 0.5s
      
      &:hover
        color: white
        background-color: #f95e5e  
  &:hover
    transform: translateY(-10px)
    .left
      transform: translateY(-10px)
    
.fixed-control

  position: fixed
  right: 30px
  top: 30px
  color: white
  z-index: 1000
  opacity: 0.5
  cursor: pointer
  transition: 0.5s
  &:hover
    opacity: 1
  .icon
    font-size: 30px
    margin-right: 10px
.control
  +size(100%)
  +fixedPos(30px,30px)
  +flexCenter
  color: #eee
  background-image: linear-gradient(5deg,#111 0%,#111 50%, transparent 100%)
  padding: 5vw
  box-sizing: border-box
  opacity: 0
  pointer-events: none
  transition: 0.5s
  &.isCartOpen
    opacity: 1
    pointer-events: initial
  .panel
    width: 70%

    ul
      padding: 0
      list-style: none
      li
        display: flex
        padding: 5px 10px
        margin-top: 5px
        margin-bottom: 5px
        transition: 0.5s
        cursor: pointer
        &:hover
          background-color: rgba(white,0.1)
          transform: translateY(-10px)
        h3
          font-size: 17px
          font-weight: normal
          width: 100%
          opacity: 0.8
          display: inline-block
          .price
            float: right
          .remove
            display: inline-block
            padding: 4px 15px
            font-size: 30px
            border-radius: 50px
            margin-left: 20px
            &:hover
              background-color: #FF2946
    .thumbnail
      +size(50px,70px)
      diplay: inline-block
      margin-right: 20px
.buybox
  +size(50px,80px)
  background-color: white
  position: fixed
  right: 30px
  top: 30px
  opacity: 0


</style>
