// axios错误拦截器
import { Message } from 'element-ui';
export default (context)=>{
    context.$axios.onError(res=>{
        
        const {message,statusCode} = res.response.data
        if(statusCode==400){
            Message.error(message)
        }
        if(statusCode==403){
            Message.error('请首先登录噢')
            console.log($axios);
            
        }
    });
    
    
}