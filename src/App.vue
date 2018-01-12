<template>
  <div id="app2">
    <img src="./assets/imgs/logo.png">
    <h1>{{msg}}</h1>
    <firstcomponent></firstcomponent>
    <ul>
        <li><router-link to="/first">点我跳转到第一页</router-link></li>
        <li><router-link to="/second">点我跳转到第二页</router-link></li>
      </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
    import './assets/css/style.css';
    import firstcomponent from './component/firstcomponent.vue'
    export default {
      data () {
        return {
          msg: 'This is my first vue app!'
        }
      },
      components: { firstcomponent }
    }
</script>
