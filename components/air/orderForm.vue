<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
<template>
<!-- 其他代码 -->

				<div 
                class="member-info-item" 
                v-for="(item, index) in users" 
                :key="index">
                    <el-form-item label="乘机人类型">
                        <el-input 
                        placeholder="姓名" 
                        v-model="item.username" 
                        class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1"  
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码" 
                        v-model="item.id"   
                        class="input-with-select">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="身份证" 
                                           value="1" 
                                           :checked="true">
    							</el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
					
                	<!-- 移除乘机人按钮 -->
                    <span class="delete-user" 
                          @click="handleDeleteUser(index)">-</span>
                </div>

<!-- 其他代码 -->
</template>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item"
                v-for='(item,index) in flightsData.insurances'>
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" 
                    @change="getInsurances(item.id)"
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model='contactName'></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model='captcha'></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            users: [{
                username: "",
                id: "",
            }],
            flightsData:{},
            // 用户选择保险的id
            insurances:[],
            // 联系人名字
            contactName:'',
            // 联系人电话
            contactPhone:'',
            // 手机验证码
            captcha:'',
            // 是否需要发票
            invoice:false,
            // 航班ID
            seat_xid:0,
            // 座位ID
            air:0,
            
            rulesState:true,
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
                this.users = [
        ...this.users, 
        {
            username: "",
            id: "",
        }
    ];
        },
        // 获取用户选择保险的id
        getInsurances(id){
            const index = this.insurances.indexOf(id)
            if(index>-1){
                this.insurances.splice(index,1)
            }else{
                this.insurances.push(id)
            }
        },
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index, 1);
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            if(!this.contactPhone){
                this.$message.error("手机号码不能为空");
                return
            }

            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
            if(!TEL_REGEXP.test(this.contactPhone)){
                this.$message.error('请输入正确的手机格式')
                return
            }
            const data = {
                tel:this.contactPhone
            }
            this.$store.dispatch('user/authCode',data)
        },

        // 提交订单
        handleSubmit(){
            this.rulesState = true
            const form ={
            users: this.users,
            // 用户选择保险的id
            insurances:this.insurances,
            // 联系人名字
            contactName:this.contactName,
            // 联系人电话
            contactPhone:this.contactPhone,
            // 手机验证码
            captcha:this.captcha,
            // 是否需要发票
            invoice:this.invoice,
            // 航班ID
            seat_xid:this.seat_xid,
            // 座位ID
            air:this.air
            }
            const {userform} = this.$store.state.user
            // 判断用户是否登录
            if(!userform.token){
                // // 将用户填写的资料存入vuex中
                // this.$store.commit('userorder/setOrderForm',form)
                this.$router.push('/user/login')
                this.$message.warning('请首先登录噢')
                return
            }
            
            if(this.rulesState){
                this.$axios({
                    url:'/airorders',
                    method:'POST',
                    data:form,
                    headers:{
                        Authorization: `Bearer ${userform.token}`
                    }
                }).then(res=>{
                    if(res.status==200){
                        // this.this.$store.commit('userorder/setOrderForm',{})
                        this.$message.success('恭喜你，订单提交成功')
                        console.log(res);
                        
                    }
                    
                })
            }

  
            
        }
    },
    mounted(){
        // 发送机票id请求
        const {id,seat_xid} =this.$route.query;
        this.air = id
        this.seat_xid = seat_xid
        this.$axios({
            url:'/airs/'+id,
            params:{
                seat_xid
            }
        }).then(res=>{
            this.flightsData = res.data
        })

        // // 获取store里面数据
        // this.orderInfo = this.$store.state.userorder.orderForm;
        // console.log(this.$route);
        
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>