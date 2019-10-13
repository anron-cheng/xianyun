<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="cleckPassword">
                <el-input 
                v-model="form.cleckPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
import { async } from 'q';
export default {
    data(){
            // 确认密码
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
        return {
            // 表单数据
            form: {
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                cleckPassword:''
            },
            // 表单规则
            rules: {
                username:[
                    {required:true,message:'请输入用户名手机',trigger:'blur'}
                ],
                nickname:[
                    {required:true,message:'请输入你的名字',trigger:'blur'}
                ],
                captcha:[
                    {required:true,message:'请输入验证码',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
                cleckPassword:[
                    { validator: validatePass, trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 发送验证码
        async handleSendCaptcha(){
            if(!this.form.username){
                this.$message.error("手机号码不能为空");
                return
            }

            var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
            if(!TEL_REGEXP.test(this.form.username)){
                this.$message.error('请输入正确的手机格式')
                return
            }
            const res = await this.$axios({
                url:"/captchas",
                method:'POST',
                data:{
                    tel:this.form.username
                }
            })
            this.$message.success('手机验证码为'+res.data.code)
            
        },


        // 注册
        handleRegSubmit(){
            // 验证表单是否完整
            this.$refs.form.validate(async (valid) => {
              if (valid) {
                //   去除确认密码
                const {cleckPassword,...props} = this.form
                // 提交表单
                const res = await this.$axios({
                    url:'/accounts/register',
                    method:'POST',
                    data:props
                })
                if(res.status==200){
                    this.$message.success('恭喜你，注册成功')
                    setTimeout(()=>{
                        this.$store.commit('user/setUserData',res.data)
                        this.$router.push('/')
                    },1500)
                    
                }
                
              } else {
                this.$message.error("请填写完整信息");
                return false;
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