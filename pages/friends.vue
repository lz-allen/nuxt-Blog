<template>
  <Layout :exampleType="exampleType" :noteList="noteList">
    <div class="friends">
      <ul class="list">
        <li
          :class="{bg1: index === 0%5,bg2: index=== 1%5, bg3: index===2%5, bg4: index ===3%5, bg5: index === 4%5}"
          v-for="(item, index) in list"
          :key="index"
        >
          <h6>
            <div class="name">{{item.name}}</div>
            <a :href="item.website">{{item.website}}</a>
          </h6>
          <div class="avatar" :style="{backgroundImage: `url(${item.image})`}"></div>
          <div class="desc">{{item.desc}}</div>
        </li>
      </ul>
      <div class="condition">
        <h5>友链要求：</h5>
        <ul>
          <li>文章数大于20篇</li>
          <li>原则上只接受技术类博客，如果有高质量其它领域的博客也非常欢迎</li>
        </ul>
        <hr>
        <p>格式</p>
        <ul>
          <li>名称：一切从简</li>
          <li>邮箱：634989720@qq.com(保密)</li>
          <li>简介：我自己都不了解自己</li>
          <li>链接：http://lzf-allen.top</li>
          <li>头像：http://lzf-allen.top/images/user/avatar.jpg</li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/layout";
import { getCategory, getRandomArticle, getfriends } from "@/api/api";
export default {
  layout: "default",
  async asyncData({ params }) {
    let data = {};
    const { status: categoryStatus, data: categoryData } = await getCategory();
    const { status: friendsStatus, data: friendsData } = await getfriends();
    const {
      status: RandomArticleStatus,
      data: RandomArticleData
    } = await getRandomArticle();
    if (categoryStatus === 200) {
      data["exampleType"] = categoryData.data;
    }
    if (RandomArticleStatus === 200) {
      data["noteList"] = RandomArticleData.data;
    }
    if (friendsStatus === 200) {
      data["list"] = friendsData.data;
    }
    return data;
  },
  data() {
    return {
      list: []
    };
  },
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
.friends {
  animation: pageAnimation 1s;
}
.condition {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  h5 {
    color: #fff;
  }
  li{
    line-height: 1.8;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 30%;
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px 0;
    color: #fff;
    border-radius: 5px;
    background-color: #3498db;
    box-shadow: 0 2px 5px #000;
    &:hover {
      background-color: #e26968;
    }
    .name {
      padding: 5px 0;
    }
    h6 {
      color: #fff;
    }
    a {
      color: #fff;
    }
    .avatar {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 50px;
      height: 50px;
      transform: translate3d(0, -50%, 0);
      border-radius: 50%;
      box-shadow: 0 0 5px #fff;
      background-position: center;
      background-size: cover;
    }
    .desc {
      margin-top: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .bg1 {
    background-color: #3498db;
  }
  .bg2 {
    background-color: #dc3545;
  }
  .bg3 {
    background-color: #1abc9c;
  }
  .bg4 {
    background-color: #f1c40f;
  }
  .bg5 {
    background-color: #9b59b6;
  }
}
@keyframes pageAnimation {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  70% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(5%, 0, 0);
  }
  80% {
    transform: translate3d(0, 0, 0);
  }
  85% {
    transform: translate3d(5%, 0, 0);
  }
  90% {
    transform: translate3d(0, 0, 0);
  }
  95% {
    transform: translate3d(5%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@media only screen and (max-width: 768px) {
  .friends {
    padding: 20px;
  }
  .list {
    li {
      width: 100%;
      .avatar {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>