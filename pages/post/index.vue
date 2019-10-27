<template>
  <section class="main">
    <el-row>
      <el-col :span="6">
        <div class="leftsize">
          <div class="recommendBox" @mouseleave="valve=false">
            <div class="recommend_name" v-for="(item,index) in recommendCity" :key="index" @mouseover="showContent(index)">
              <span>{{item.type}}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="recommend_content" v-if="valve">
                <div class="recommend_detail" v-for="(item,index) in recommendCity[listIndex].children" :key="index">
                  <em>{{index+1}}</em>
                  <span>{{item.city}}</span>
                  <a href="javascript:;">{{item.desc}}</a>
                </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="rigthSize">
          <div class="search">
            <input type="text" placeholder="请输入想去的地方，比如：'广州'"/>
            <span class="el-icon-search"></span>
          </div>
          <div class="recommend">
            <span>推荐:</span>
            <span>广州</span>
            <span>广州</span>
            <span>广州</span>
          </div>
          <div class="nva clearfix">
            <h4>推荐攻略</h4>
            <button>写游记</button>
          </div>
          <postList v-for="(item,index) in postList" :key="index" :list='item'></postList>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import postList from '@/components/post/postList.vue'
export default {
  components:{
    postList
  },
  data(){
    return {
      // 获取城市菜单列表
      recommendCity:[],
      // 显示列表闸门
      valve:false,
      // 列表循环的id
      listIndex:0,
      // 文章总数
      total:0,
      // 文章列表
      postList:[]
    }
  },
  mounted(){
    this.$axios({
      url:'/posts/cities'
    }).then(res=>{
      const {data} = res.data
      this.recommendCity=data
    })

        this.$axios({
      url:'/posts',
    }).then(res=>{
      this.total = res.data.total
      this.postList = res.data.data
      console.log(this.postList);
      
      
    })
  },
  methods:{
    // 城市菜单列表
    showContent(index){
      this.valve = true;
      this.listIndex = index
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .leftsize {
    .recommendBox{
      position: relative;
      border-top: 1px solid rgb(190, 189, 189);
      width: 260px;
      .recommend_name{
        height: 20px;
        padding: 10px 20px;
        border: 1px solid rgb(190, 189, 189);
        border-top: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .recommend_name:hover{
        color: orange;
      }
      .recommend_content{
        position: absolute;
        width: 310px;
        padding: 10px 20px;
        left:259px;
        top: -1px;
        border: 1px solid #999;
        background-color: #fff;
        z-index: 1;
        .recommend_detail{
          color: orange;
          font-size: 14px;
          line-height: 2.5em;
          >em{
          font-style: italic;
          padding-right: 5px;
          font-weight: 600;
          }
          >span{
          padding-right: 5px;
          }
          >a{
            color: #888;
          }
          >a:hover{
            color: orange;
            border-bottom: 1px solid orange;
          }
        }

      }

    }
  }
  .rigthSize {
    margin-left: 40px;
    .search {
      position: relative;
      > input {
        width: 100%;
        border: 3px solid orange;
        padding: 0 20px;
        box-sizing: border-box;
        height: 40px;
        outline: none;
      }
      > span {
        position: absolute;
        top: 10px;
        right: 17px;
        font-size: 21px;
        color: orange;
      }
    }
    .recommend{
    padding: 10px 0;
      >span{
        color: #888;
        font-size: 12px;
      }
    }
    .nva{
      >h4{
        display: block;
        float: left;
        font-size: 18px;
        height: 50px;
        color: orange;
        // padding-bottom: 10px;
        border-bottom: 2px solid orange;
      }
      >button{
        float: right;
        background-color: #409eff;
        width: 106px;
        height: 40px;
        color: white;
        font-size: 14px;
        border: none;
        border-radius: 5px;
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