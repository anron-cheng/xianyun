<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm @flightsData='flightsData' @total='total'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside :data="infoData" :allprice='allprice'/>        
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
import OrderAside from "@/components/air/OrderAside.vue";
export default {
    data(){
        return {
            // 机票信息
            infoData: {
                insurances: [], // 初始化保险数据
                seat_infos: {}
            },
            allprice:{}
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    methods:{
        // 航班信息
        flightsData(data){
            this.infoData = data
        },
        // 价格总数
        total(allprice){
            this.allprice = allprice
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>