// 搜索历史
import { Message } from 'element-ui';
export const state = () => {
    return {
        // 搜索的历史记录
        history: []
    }
}

export const mutations = {
    // 设置history的值,data是搜索表单的对象
    setHistory(state, data){
        if(state.history.length<5){
        // 把最新的记录追加到第一个
        state.history.unshift(data); 
        }else{
            // 删除最后一个历史记录再添加
        state.history.unshift(data); 
        state.history.pop(data); 
        }
 
    }
}