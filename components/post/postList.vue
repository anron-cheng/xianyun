<template>
  <div class="box">
    <a to class="post">
      <img :src="list.images[0]" alt="" class="singlePicture" v-if="list.images.length!=0 && list.images.length<=2 ">
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3885376987,415548851&fm=11&gp=0.jpg" alt="" class="singlePicture" v-if="list.images.length==0">
      <div class="container">
      <h3>{{list.title}}</h3>
      <span class="content" :class="list.summary? '':'contentNull'">
          {{list.summary}}
      </span>
      <div class="pictureBox" v-if="list.images.length>2">
      <img :src="list.images[0]" alt="">
      <img :src="list.images[1]" alt="">
      <img :src="list.images[2]" alt="">
      </div>
      <div class="postInfo"  :class="list.images.length>2? 'more':'single'">
          <div class="infoLeft">
          <i class="el-icon-location-outline"></i>
          <span>{{list.cityName}}</span>
          <span>by</span>
          <img :src="`${$axios.defaults.baseURL}${list.account.defaultAvatar}`" alt="">
          <span class="username">{{list.account.nickname}}</span>
          <i class="el-icon-view"></i>
          <span>{{list.watch}}</span>
          </div>
          <span class="userLike" v-text="list.like? list.like+' 赞': '0 赞'">{{list.like}} 赞</span>
      </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Object,
            default:[]
        }

    },
    data(){
        return{
            valve:true
        }
    }
};
</script>

<style scoped lang='less'>
.box {
    padding: 20px 0;
    border-top: 1px solid #888;
    border-bottom: 1px solid #888;
  .post {
      display: flex;
      justify-content: space-between;
      position: relative;
    .singlePicture{
        width: 220px;
        height: 150px;
        padding-right: 5px;
    }
    .container{
      > h3 {  
      font-size: 18px;
      font-weight: 500;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    >h3:hover{
      color: orange;
    }
    .content {
      padding-top: 15px;
      font-size: 14px;
      color: #888;
      line-height: 25px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .contentNull{
      width: 485px;
      height: 89px;
    }
    .pictureBox{
        padding: 15px 0 30px 0 ;
        display: flex;
        justify-content: space-between;
        >img{
            height: 150px;
            width: 32%;
        }
    }
    .postInfo{
        position: absolute;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        font-size: 12px;
        color: #888;
       .infoLeft{
            >img{
            vertical-align: text-top;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            
            }
        .username{
            color: orange;
        }
       }

        .userLike{
            font-size: 16px;
            color: orange;
        }
    }
    .single{
        width: 485px;
    }
    .more{
        width: 100%;
    }
    }

  }
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
</style>