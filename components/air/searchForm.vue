<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span 
            v-for="(item, index) in tabs" 
            :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">

                <!-- fetch-suggestions: 类似于input方法，每次输入框值发生变化时候回触发 -->
                <!-- select：选中下拉列表中的值的时候触发的触发  -->
                <el-autocomplete
                :fetch-suggestions="querySearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                @blur="selectBlur('depart')"
                ></el-autocomplete>
            </el-form-item>


            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="querySearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                @blur="selectBlur('dest')"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="Datevalue">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
        
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            // 最终表单要提交的属性
            form: {
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",  // 到达城市
                destCode: "",  // 到达城市代码
                departDate: "", // 日期字符串
            },
            // 用户输入关键字后返回的数据列表
            newData:[],
            Datevalue:''
            
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        
        // 出发城市输入框值发生变化时候会触发
        // value：输入框的值
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性
         querySearch(value, cb){
            // 如果value为空则跳出  
            if(!value){
            // // 空数组则不会弹出下拉框
                cb([]) 
                return
            }
            this.newData =[]
            // 获取后台有关键字的城市名
            this.$axios({
                url:"/airs/city?name="+value,
                method:'GET',
            }).then(res=>{
                const {data} = res.data
                const newData=[]
                // 在获取的数据中添加value键值
                data.forEach(v => {
                    v.value = v.name.replace('市','')
                    newData.push(v)   
                });
                    this.newData = newData
                    cb(newData)
            })
            
            // 请求搜索建议城市
            
            // var arr = [
            //     {value: "广州"},
            //     {value: "广元"},
            // ]
            // cb(arr)
        },
        // 当输入框失去焦点时
         selectBlur(site){
          if(!this.newData.length>0) return
          this.form[site+'City'] = this.newData[0].value
          this.form[site+'Code'] = this.newData[0].sort

        },
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
          
            this.form.departCity = item.value
            this.form.departCode = item.sort
        },
        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value
            this.form.destCode = item.sort
        },
        // 确认选择日期时触发
        handleDate(value){
          this.form.departDate = moment(value).format('YYYY-MM-DD')
        },
        // 触发和目标城市切换时触发
        handleReverse(){
           const {departCity,departCode,destCode,destCity} = this.form
           this.form.departCity = destCity
           this.form.departCode = destCode
           this.form.destCity = departCity
           this.form.destCode = departCode
        },
        // 提交表单是触发
        handleSubmit(){
          const pass = true
          const rules={
                departCity:{
                  message:'请输入出发地点',
                  value:this.form.departCity
                },
                destCity:{
                  message:'请输入到达地点',
                  value:this.form.destCity
                },
                departDate:{
                  message:'请输入出发日期',
                  value:this.form.departDate
                },
          }
          // console.log(rules[departCity]);
          
            Object.keys(rules).forEach(v=>{
                if(!rules[v].value){
                  pass = false
                  this.$message.error(rules[v].message)
                  return 
                }
            })
            
           if(pass){
                this.$router.push({
                path: "/air/flights",
                query: this.form
            })
           }
           
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}
.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }
  .active{
    border-top-color: orange;
    background:#fff;
  }
  i{
    margin-right:5px;
    font-size: 18px;
    &:first-child{
      font-size:16px;
    }
  }
}
.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;
  .el-autocomplete{
    width: 100%;
  }
}
.reverse{
  position:absolute;
  top: 35px;
  right:15px;
  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }
  &:after{
      top:0;
    }
    &:before{
      top:60px;
    }
  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }
    &:after{
      top:-20px;
    }
    &:before{
      top:20px;
    }
  }
}
</style>