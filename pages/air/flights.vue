<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>

                </div>

                <!-- 航班头部布局 -->
                <FlightsListHead/>

                <!-- 航班信息 -->
                <FlightsItem v-for="(item,index) in fligthsData.flights" :key="index" :item='item'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"
export default {
    components: {
        FlightsListHead,
        FlightsItem
    },
    data(){
        return {
            fligthsData:[]
        }
    },
    methods:{

    },
    mounted(){
        // 获取后台机票数据
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            this.fligthsData = res.data
            
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }
    .flights-content{
        width:745px;
        font-size:14px;
    }
    .aside{
        width:240px;
    } 
</style> 