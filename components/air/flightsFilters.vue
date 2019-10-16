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
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
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
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
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
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in fligthsData.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            // 目的地和出发时间信息
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
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            const arr = this.fligthsData.flights.filter(v=>{
                return v.org_airport_name ===value
            })
            this.$emit('filteritem',arr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const arr = value.split(',')
            const resArr = this.fligthsData.flights.filter(v=>{
                 const start =  v.dep_time.split(':')
                 return (+arr[0]) <= (+start[0]) && (+arr[1])>(+start[0])
            })
            this.$emit('filteritem',resArr)  
        },

         // 选择航空公司时候触发
        handleCompany(value){
            const arr = this.fligthsData.flights.filter(v=>{
                return v.airline_name ===value
            })
            this.$emit('filteritem',arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
            const arr = this.fligthsData.flights.filter(v=>{
                return v.plane_size ===value
            })
            this.$emit('filteritem',arr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
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