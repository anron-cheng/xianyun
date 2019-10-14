// 用户管理 
import { Message } from 'element-ui';
export const state =function() {
    return {
        userform:{
        },
    }
}

export const mutations = {
    setUserData(state,data){
        // 将用户信息存入到state中
        state.userform = data
        
    }
}

export const actions = {
    // 用户登陆
    async userLogin(store,data){
        var res =await this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        })

        if(res.status==200){
            Message.success('登录成功')
           const data = res.data
        //    将数据存入store中
        store.commit('setUserData',data)
        }
    },
    // 用户获取验证码
    async authCode(store,data){
        const res = await this.$axios({
            url:"/captchas",
            method:'POST',
            data
        })
        if(res.status==200){
            Message.success('手机验证码为'+res.data.code)
        }
        
    }
}