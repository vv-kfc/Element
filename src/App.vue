<template>
  <div id="app">
    <div>

        <Element></Element>
        <Pos></Pos>
        <!-- <Product></Product> -->

    </div>
  </div>
</template>

<script>
import Element from '@/components/Element'
import Pos from '@/components/Pos'
import axios from 'axios'
// import Product from '@/components/Product'
export default {
  name:'app',
  components:{
    Element,
    Pos
    // Product
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  *{
    padding: 0;
    margin: 0;
   }
}
</style>
