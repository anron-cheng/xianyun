<template>
    <div class="container"> 
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{order.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="canvas"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { async } from 'q'
export default {
    data(){
        return {
            order:{},
            // 二维码地址
            code_url:'',
            stoptime:null
        }
    },
    mounted(){
        const {id} = this.$route.query
         console.log(location.pathname);
        
        
        
        // 设置延迟等待vuex获取数据
        setTimeout(async ()=>{
        // const {userform} = this.$store.state.user;
        // 获取二维码数据    
        const res = await this.$axios({
            url:'/airorders/'+id,
            method:'GET',
            headers:{
                Authorization:`Bearer ${this.$store.state.user.userform.token}`
            }
        })
        this.order = res.data

        // 获取二维码标签API
        var canvas = document.getElementById('canvas')
        // 将二维码渲染到页面
        QRCode.toCanvas(canvas, this.order.payInfo.code_url)

        // 每隔3秒钟发送一下请求检查订单是否支付
        this.stoptime = setInterval(async () => {
            const res =await this.$axios({
                url:'/airorders/checkpay',
                method:'POST',
                data:{
                    id:this.order.id,
                    nonce_str:this.order.price,
                    out_trade_no:this.order.orderNo
                },
                headers:{
                    Authorization:`Bearer ${this.$store.state.user.userform.token}`
                },
            })
            if(res.data.statusTxt=='订单已支付'){
                this.$message.success('恭喜你,'+res.data.statusTxt)
                clearInterval(this.stoptime)
            }
        }, 3000);  
        },10)



    },
    destroyed(){
        clearInterval(this.stoptime)
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #canvas{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>