<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{fligthdetail.departCity}} - {{fligthdetail.destCity}} 
                / 
                {{fligthdetail.departDate}} 
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airport" placeholder="起飞机场" >
                    <el-option 
                    v-for="(item,index) in fligthsData.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.flightTimes"  placeholder="起飞时间" >
                    <el-option
                    v-for="(item,index) in fligthsData.options.flightTimes"
                    :key="index"
                    :label='`${item.from}:00-${item.to}:00`'
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.company"  placeholder="航空公司" >
                    <el-option
                    v-for="(item,index) in fligthsData.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="filters.airSize" placeholder="机型" >
                    <el-option
                    v-for="(item,index) in planeSize"
                    :key="index"
                    :label="item.type"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            filters:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
                // 目的地和出发时间信息
                
            },
            fligthdetail:''  ,
            planeSize:[
                {size:'L',type:'大'},
                {size:'M',type:'中'},
                {size:'S',type:'小'},
            ]     
        }
    },
    props:{
        fligthsData:{
            type:Object,
            default:[],
        }
    },
    watch:{
        // 多重过滤
        filters:{
            deep:true,
            handler(){
                const arr = this.fligthsData.flights.filter(v=>{
                   let res = true 
                //    过滤起飞机场
                   if(this.filters.airport && v.org_airport_name!==this.filters.airport){
                       res = false
                   }
                //    出发时间过滤
                   if(this.filters.flightTimes){

                    const dtime = this.filters.flightTimes.split(',')
                    const start =  v.dep_time.split(':')
                    res =  (+dtime[0]) <= (+start[0]) && (+dtime[1])>(+start[0])
                   }
                // 航空公司过滤
                    if(this.filters.company && v.airline_name!==this.filters.company){
                       res = false
                   }
                // 飞机大小过滤
                    if(this.filters.airSize && v.plane_size!==this.filters.airSize){
                       res = false
                   }
                   return res
                })
               this.$emit('filteritem',arr) 
            }
        }
    },
    methods: {
        // 撤销条件时候触发
        handleFiltersCancel(){
            // 所有过滤条件清空
            Object.keys(this.filters).forEach(v=>{
                this.filters[v]= ''
            })
            // 将所有数据返回给父组件
            const arr = this.fligthsData.flights
            this.$emit('filteritem',arr)
        },
    },
    mounted(){
        // 根据路由获取航班信息
        this.fligthdetail = this.$route.query 
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>