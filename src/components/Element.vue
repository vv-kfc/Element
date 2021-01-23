<template>
  <div class="pos">

    <ul>
     <!-- <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li> -->
      <li><i class="el-icon-edit"></i>
        <div><span>收银</span></div>
      </li>
      <li><i class="el-icon-share"></i>
        <div><span>店铺</span></div>
      </li>
      <li><i class="el-icon-delete"></i>
        <div><span>商品</span></div>
      </li>
      <li><i class="el-icon-s-tools"></i>
        <div><span>会员</span></div>
      </li>
      <li><i class="el-icon-s-tools"></i>
        <div><span>统计</span></div>
      </li>
      <li><i class="el-icon-s-tools"></i>
        <div><span>设置</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .pos {
    width: 80px;
    height: 1000px;
    background-color: #1D8CE0;
    float: left;

  }
  .pos span{
    display: block;
    padding-top: 5px;
  }

  i{
    font-size: 24px;
    margin-top: 18px;
  }

  .pos ul{
    padding: 0;
    margin: 0;
  }

  .pos ul li {

    list-style: none;
    text-align: center;
    width: 80px;
    height: 90px;
    color: white;
    border-bottom: 1px solid white;
  }

  .pos ul li:hover{

    background-color: royalblue;

  }
</style>
