// 用户管理 
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

}