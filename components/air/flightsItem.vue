<template>
    <div class="flight-item">
        <div @click="flightDetail=!flightDetail">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{item.airline_name}} </span>{{item.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.dep_time}}</strong>
                            <span>{{item.org_airport_name}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{need}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{item.arr_time}}</strong>
                            <span>{{item.dst_airport_name}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{item.base_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="flightDetail">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  
            justify="space-between" 
            align="middle" 
            v-for="(seat,index) in item.seat_infos" 
            :key="index">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{seat.name}}</span> | {{seat.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{seat.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{seat.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 数据
        data: {},
        // item是声明组件可以接受item属性
        item:{
            type: Object,
            // 默认是空数组
            default: {}
        }
 
        
    },
    data(){
        return {
            flightDetail:false,
            need:''

        }
    },
    methods:{

    },
    mounted(){
        // 计算到达目的地需要的时间渲染到页面中
        const end = this.item.arr_time.split(':')
        const start = this.item.dep_time.split(':')
        if(start[0]>end[0]){
            end[0] = (+end[0])+24
        }
        // console.log(end[0]*);
        
        const resTime = (end[0]*60+ (+end[1])) - (start[0]*60+ (+start[1]))
        const hour = Math.floor(resTime/60)
        const minute = resTime % 60
        this.need = `${hour}时${minute}分` 
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;
        .flight-info{
            padding:15px;
            cursor: pointer;
            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }
        .flight-info-center{
            padding:0 30px;
            text-align: center;
            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }
            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }
        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }
    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;
        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;
            &:last-child{
                border-bottom: none;
            }
            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 
            .price{
                font-size: 20px;
                color:orange;
            }
            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style> 