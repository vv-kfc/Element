<template>
  <div class="post">
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="10" class="post-order" id="order-list">
        <el-tabs>

          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsName" label="商品" width="220">
              </el-table-column>
              <el-table-column prop="count" label="数量" width="185">
              </el-table-column>
              <el-table-column prop="price" label="金额" width="185">
              </el-table-column>
              <el-table-column label="操作" width="155" fixed="right" >
                <template slot-scope="scope">
                  <el-button @click="delGoodes(scope.row,tableData)" type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row,tableData)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
               <small>数量：{{totalCount}}</small>  <small>金额：{{totalMoney}}元</small>
            </div>
            <div class="div-btn">

              <el-button type="warning" size="medium" @click="pendingOrder(pendingBox.pendingData)">挂单</el-button>
              <el-button type="danger" size="medium" @click="delAllGoods()">清空</el-button>
              <el-button type="primary" size="medium" :plain="true" @click="checkout()">结账</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="挂单">
              <el-table :data="pendingBox.pendingData" border style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
            </el-table>
            <div class="total-goods">
               <span><small>数量：</small>{{pendingBox.pendingCount}}</span>
                <span><small>金额：</small>{{pendingBox.pendingMoney}}元</span>
            </div>
            <div class="div-btn">
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
            </div>

          </el-tab-pane>

        </el-tabs>

      </el-col>

      <el-col :span="14" class="post-right">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" :key="goods.goodsId"  @click="addOrderList(goods,tableData)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>

              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" :key="goods.goodsId"  @click="addOrderList(goods,tableData)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>

                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" :key="goods.goodsId"  @click="addOrderList(goods,tableData)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>

                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" :key="goods.goodsId"  @click="addOrderList(goods,tableData)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>

                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" :key="goods.goodsId"  @click="addOrderList(goods,tableData)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>

                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>

    </el-row>
  </div>


</template>

<script>
  import axios from 'axios'
  export default {
    name: 'pos',
    data() {
      return {
        tableData: [],
        oftenGoods: [

        ],
        type0Goods: [

        ],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalMoney:0,
        totalCount:0,
        pendingBox:{
        pendingData:[],
        pendingCount: 0,
        pendingMoney: 0,
      },
      }
    },

    created() {
      axios.get('./json/oftenGoods.json')
        .then(respone => {
          // console.log(respone);
          this.oftenGoods = respone.data;
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问')
        })

      axios.get('./json/typeGoods.json')
        .then(respone => {
          // console.log(respone);
          this.type0Goods = respone.data.hanbao;
          this.type1Goods = respone.data.xiaoshi;
          this.type2Goods = respone.data.taocan;
          this.type3Goods = respone.data.kele;
        })
    },

    mounted() {
      var orderHeiht = document.body.clientHeight;

      document.getElementById('order-list').style.height = orderHeiht + 'px';
      this.pendingBox.pendingData = this.getPendingData();
    },

    methods: {
     
       //点击挂单后，将tableData的点餐数据保存到浏览器中
       pendingOrder(data){
          if(this.tableData){
              //将数组对象转化为字符串
          let str = JSON.stringify(this.tableData)
          localStorage.setItem('localOrder', str);
          this.pendingBox.pendingData = this.tableData;
          this.tableData = [];
              this.$message({
          message: '挂单成功！',
          type: 'success'
        });
          }
          this.getAllMoney(data);
         
       },

 //获取已挂单数据
     getPendingData(){
      let obj = localStorage.getItem('localOrder');
      return JSON.parse(obj);
    },
//删除所有商品
       delAllGoods(){
      if(this.tableData){
        this.totalCount = 0;
        this.totalMoney = 0;
        this.tableData=[];
      }
      if(this.pendingBox.pendingData){
        this.pendingBox.pendingData = [];
        this.pendingBox.pendingCount= 0;
        this.pendingBox.pendingMoney= 0;
      }
    },
      addOrderList(goods,data){
        //商品是否已经存在订单列表中
        // console.log('a');
        this.totalMoney =0;
        this.totalCount =0;
        let isHave =false;
        for(let i = 0 ;i<this.tableData.length ;i++){
          if(this.tableData[i].goodsId == goods.goodsId){

            isHave =true;
          }

        }
        if(isHave){
          //改变列表中商品数量
          let arr = this.tableData.filter( o =>o.goodsId == goods.goodsId);
          arr[0].count++;
        }else{
          let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
          this.tableData.push(newGoods);
        }
        this.getAllMoney(data);
      },
      //删除单个商品
      delGoodes(goods,data){

        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId)
      if(arr[0].count<=1){
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
      }else{
        arr[0].count--;
      }
      this.getAllMoney(data);
      },

      checkout(){
        if(this.totalCount!=0){
          this.tableData =[];
          this.pendingData =[];
          this.totalMoney =0;
          this.totalCount =0;
          this.$message({
          message: '恭喜您，结账成功，商品马上为您送达！',
          type: 'success'
        });
        }else{
           this.$message({
          message: '购物车为空！请先选购！',
          type: 'warning'
        });
        }

      },

     //汇总全部金额和数量
    getAllMoney(data){
      this.totalCount = 0;
      this.totalMoney = 0;
      this.pendingBox.pendingCount= 0;
      this.pendingBox.pendingMoney= 0;
      //进行数量和价格的汇总计算
      if(data===this.tableData){
        data.forEach((element) => {
          this.totalCount = this.totalCount+element.count;
          this.totalMoney = this.totalMoney + (element.price*element.count);
        });
      }else{
        // console.log('pendingData')
        console.log(this.pendingBox.pendingData)
        data.forEach((element) => {
          this.pendingBox.pendingCount = this.pendingBox.pendingCount+element.count;
          this.pendingBox.pendingMoney = this.pendingBox.pendingMoney + (element.price*element.count);
        });
      }
    },

    }
  }
</script>

<style>
  .post-order {
    /* width:40%; */
    height: 1000px;
    background-color: ;
    border: 1px solid darkgray;

    /* float: left; */
  }

  .post-right {
    background-color: whitesmoke;
    height: 1000px;
    border: 1px solid darkgray;
  }

  .div-btn {
    margin-top: 10px;
  }

  .title {
    height: 20px;
    border: 1px solid beige;
    background-color: #F9FAFC;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid gray;
  }

  .often-goods-list ul li {

    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 10px;
    background-color: white;
    cursor: pointer;
  }

  .o-price {
    color: #1D8CE0;

  }

  .goods-type {
    clear: both;
  }


 .cookList{
   cursor: pointer;
 }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;

  }

  .cookList li span {

    display: block;
    float: left;
  }

  .foodImg {
    width: 40%;
  }

  .foodName {
    font-size: 16px;
    padding-left: 10px;
    color: brown;

  }

  .foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totalDiv{
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #d3dce6;
   border-top:1px solid #d3dce6 ;
  }
  small{
    padding: 10px;

  }
</style>
