<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username"
            >
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password"
            >
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit('form')">
            登录
        </el-button>
    </el-form>

</template>

<script>
import { async } from 'q';
export default {
    data(){
        return {
            // 表单数据
            form: {
                username:'13800138000',
                password:'123456'
            },
            // 表单规则
            rules: {
                username:[
                    {required:true,message:'请输入用户名/手机',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            },
            
        }
    },
    methods: {




        // 提交登录
        handleLoginSubmit(formName){          
        //  校验表单是否完整，如果完成则提交数据   
        this.$refs.form.validate(async (valid) => {
            // 如果valid为true
          if (valid) {
            // 提交表单数据
        //     var res = await this.$axios({
        //        url:'/accounts/login',
        //        method:'POST',
        //        data:this.form
        //    })

            // 利用store异步方法action封装登录方法
            this.$store.dispatch('user/userLogin',this.form)

        //    if(res.status==200){
        //        this.$message.success('登录成功')
        //        this.$store.state
        //        const data = res.data
        //     //    将数据存入store中
        //     this.$store.commit('user/setUserData',data)
        //     setTimeout(()=>{
        //         this.$router.push('/')
        //     },1000)
        //    }


          } 
        });
        
        

           
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>